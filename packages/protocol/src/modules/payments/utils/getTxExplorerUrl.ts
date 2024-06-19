import { EBlockchain } from 'multirpc-sdk';

import { EXPLORER_URLS } from '../const';

export type TLinkType = 'tx' | 'address' | 'block';

export const getTxExplorerUrl = (
  network: EBlockchain,
  txHash = '',
  type: TLinkType = 'tx',
) => {
  return `${EXPLORER_URLS[network]}/${type}/${txHash}`;
};
