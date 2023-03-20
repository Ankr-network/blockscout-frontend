export interface IBridgeNotarizeResponse {
  encodedProof: string;
  encodedReceipt: string;
  signature: string;
}

export interface IBridgeApproveResponse {
  isApproved: boolean;
  txHash?: string;
}
