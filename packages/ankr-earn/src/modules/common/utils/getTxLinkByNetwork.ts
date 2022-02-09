import { EXPLORER_URLS, SupportedChainIDS } from '../const';

export function getTxLinkByNetwork(txHash: string, network: number): string {
  const url = EXPLORER_URLS[network as SupportedChainIDS] ?? EXPLORER_URLS[1];
  return `${url}/tx/${txHash}`;
}
