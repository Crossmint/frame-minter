import { CHAIN, CROSSMINT_API_KEY, CROSSMINT_COLLECTION_ID, IS_TESTING, NEXT_PUBLIC_URL } from "@/const";
import { MintService } from "@/lib/crossmint/mint-service";
import { FrameAPIController } from "@/lib/frames/frame-controller";
import { FrameMetadata } from "@/lib/frames/types";
import { FrameValidationData } from "@coinbase/onchainkit";

export class MintController extends FrameAPIController {
  private mintService: MintService;

  constructor() {
    super();
    this.mintService = new MintService(CROSSMINT_API_KEY, CROSSMINT_COLLECTION_ID, CHAIN, IS_TESTING);
  }

  async _handle(url: string, queryParams: URLSearchParams, frameParams: FrameValidationData): Promise<FrameMetadata> {
    // TODO error handling
    const templateId = queryParams.get("templateId")!;

    const userAddress = frameParams.interactor.verified_accounts[0];
    if (!userAddress) {
      console.log("No account");
      return FRAME_ERROR_NO_ACCOUNT(url);
    }

    const isRecast = frameParams.recasted;
    if (!isRecast) {
      console.log("Not recast");
      return FRAME_ERROR_NEED_RECAST(url);
    }

    const nftId = await this.mintService.mintToWallet(userAddress, templateId);

    return FRAME_MINT_LOADING(nftId);
  }
}

const FRAME_ERROR_NO_ACCOUNT = (url: string): FrameMetadata => {
  return {
    buttons: [
      {
        label: `Try Again`,
        action: "post",
      },
    ],
    image: `${NEXT_PUBLIC_URL}/images/frame-no-address.png`,
    post_url: url,
  };
};

const FRAME_ERROR_NEED_RECAST = (url: string): FrameMetadata => {
  return {
    buttons: [
      {
        label: `I have recasted`,
        action: "post",
      },
    ],
    image: `${NEXT_PUBLIC_URL}/images/frame-need-recast.png`,
    post_url: url,
  };
};

export const FRAME_MINT_LOADING = (nftId: string): FrameMetadata => {
  return {
    buttons: [
      {
        label: `Check mint status`,
      },
    ],
    image: `${NEXT_PUBLIC_URL}/images/frame-mint-in-progress.png`,
    post_url: `${NEXT_PUBLIC_URL}/api/frame/status/?nftId=${nftId}`,
  };
};
