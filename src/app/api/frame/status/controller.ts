import { CHAIN, CROSSMINT_API_KEY, CROSSMINT_COLLECTION_ID, IS_TESTING, NEXT_PUBLIC_URL } from "@/const";
import { MintService } from "@/lib/crossmint/mint-service";
import { FrameAPIController } from "@/lib/frames/frame-controller";
import { FrameMetadata } from "@/lib/frames/types";
import { FrameValidationData } from "@coinbase/onchainkit";
import { FRAME_MINT_LOADING } from "../mint/controller";

export class MintStatusController extends FrameAPIController {
  private mintService: MintService;

  constructor() {
    super();
    this.mintService = new MintService(CROSSMINT_API_KEY, CROSSMINT_COLLECTION_ID, CHAIN, IS_TESTING);
  }

  async _handle(url: string, queryParams: URLSearchParams, frameParams: FrameValidationData): Promise<FrameMetadata> {
    const nftId = queryParams.get("nftId")!; // TODO error handling

    const didMintComplete = await this.mintService.checkStatus(nftId);
    console.log(`mintComplete ${didMintComplete}`);

    if (didMintComplete) {
      return MINT_COMPLETE_FRAME(nftId);
    } else {
      return FRAME_MINT_LOADING(nftId);
    }
  }
}

const MINT_COMPLETE_FRAME = (nftId: string): FrameMetadata => {
  return {
    buttons: [
      {
        label: "Done. Keep scrolling...",
        action: "post_redirect",
      },
    ],
    image: `${NEXT_PUBLIC_URL}/images/frame-mint-complete.png`,
    post_url: `${NEXT_PUBLIC_URL}/api/frame/status/?nftId=${nftId}`,
  };
};
