import { FrameRequest, FrameValidationData, getFrameMessage, getFrameHtmlResponse } from "@coinbase/onchainkit";
import { FrameMetadata } from "./types";
import { NEXT_PUBLIC_URL } from "@/const";

// TODO add origin check and way to override
export abstract class FrameAPIController {
  abstract _handle(url: string, queryParams: URLSearchParams, frameParams: FrameValidationData): Promise<FrameMetadata>;

  async handle(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const queryParams = url.searchParams;

    const body: FrameRequest = await req.json().catch(function (err) {
      console.error("Malformed request", err);
      return frameResponse({
        buttons: [
          {
            label: "Try Again",
            action: "post",
          },
        ],
        image: `${NEXT_PUBLIC_URL}/images/frame-malformed-request.png`,
        post_url: req.url,
      });
    });

    const { isValid, message } = await getFrameMessage(body);
    if (!isValid) {
      console.error("Invalid request", JSON.stringify(body));
      return frameResponse({
        buttons: [
          {
            label: "Try Again",
            action: "post",
          },
        ],
        image: `${NEXT_PUBLIC_URL}/images/frame-invalid-request.png`,
        post_url: req.url,
      });
    }

    const res = await this._handle(req.url, queryParams, message);

    return frameResponse(res);
  }
}

function frameResponse(res: FrameMetadata) {
  return new Response(getFrameHtmlResponse(res));
}
