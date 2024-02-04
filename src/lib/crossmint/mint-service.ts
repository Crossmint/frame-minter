// TODO error handling and retries
export class MintService {
  private apiUrl: string;
  private headers: { "X-API-KEY": string; "Content-Type": string };
  private chain: string;

  constructor(apiKey: string, collectionId: string, chain: string, testMode: boolean = false) {
    const subdomain = testMode ? "staging" : "www";
    this.apiUrl = `https://${subdomain}.crossmint.com/api/2022-06-09/collections/${collectionId}/nfts`;
    this.chain = chain;
    this.headers = { "X-API-KEY": apiKey, "Content-Type": "application/json" };
  }

  async mintToWallet(address: string, templateId: string) {
    const nftBody: any = {
      templateId,
      recipient: `${this.chain}:${address}`,
    };

    console.log("Making request to mint NFT...");
    const result = await fetch(this.apiUrl, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(nftBody),
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
    console.log("Request result:");
    console.log(result);

    return result.id!;
  }

  async checkStatus(nftId: string): Promise<boolean> {
    console.log("Fetching NFT Mint Status...");
    const result = await fetch(`${this.apiUrl}/${nftId}`, {
      method: "GET",
      headers: this.headers,
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
    console.log("Mint status:");
    console.log(result);

    return result.onChain.status === "success";
  }
}
