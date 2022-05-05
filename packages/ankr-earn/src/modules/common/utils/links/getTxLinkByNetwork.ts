import { EXPLORER_URLS, SupportedChainIDS } from '../../const';

export type TLinkType = 'tx' | 'address' | 'block';

export function getTxLinkByNetwork(
  txHash: string,
  network: number,
  type: TLinkType = 'tx',
): string {
  const url = EXPLORER_URLS[network as SupportedChainIDS] ?? EXPLORER_URLS[1];
  return `${url}/${type}/${txHash}`;
}
