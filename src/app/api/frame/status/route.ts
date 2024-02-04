import { MintStatusController } from "./controller";

export const dynamic = "force-dynamic";
export const runtime = "edge";

const controller = new MintStatusController();

export async function POST(req: Request): Promise<Response> {
  console.log("POST /api/frame/status/route.ts");
  return await controller.handle(req);
}
