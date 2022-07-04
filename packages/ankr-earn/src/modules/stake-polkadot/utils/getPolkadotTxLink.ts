import { EXPLORER_POLKADOT_URLS } from '../const';
import { EPolkadotNetworks } from '../types';

export function getPolkadotTxLink(
  network: EPolkadotNetworks,
  txId: string,
): string {
  const rootURL =
    EXPLORER_POLKADOT_URLS[network] ??
    EXPLORER_POLKADOT_URLS[EPolkadotNetworks.WND];

  return `${rootURL}/extrinsic/${txId}`;
}
