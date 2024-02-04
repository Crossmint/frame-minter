import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";
import { NEXT_PUBLIC_URL, CROSSMINT_TEMPLATE_ID } from "@/const";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Mint NFT",
    },
  ],
  image: `${NEXT_PUBLIC_URL}/images/cover.webp`,
  post_url: `${NEXT_PUBLIC_URL}/api/frame/mint?templateId=${CROSSMINT_TEMPLATE_ID}`,
});

export const metadata: Metadata = {
  title: "Frame Minter",
  description: "Mint an NFT via Farcaster frames",
  openGraph: {
    title: "Frame Minter",
    description: "Mint an NFT via Farcaster frames",
    images: [`${NEXT_PUBLIC_URL}/images/cover.webp`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Frame NFT</h1>
      <p>Copy this URL in a farcaster cast in order to mint</p>
    </>
  );
}
