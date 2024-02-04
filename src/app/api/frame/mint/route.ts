import { MintController } from "./controller";

export const dynamic = "force-dynamic";
export const runtime = "edge";

const controller = new MintController();

export async function POST(req: Request): Promise<Response> {
  console.log("POST /api/frame/mint/route.ts");
  return await controller.handle(req);
}
