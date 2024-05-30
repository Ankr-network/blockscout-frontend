import { EBlockchain } from 'multirpc-sdk';

import { isMainnet } from 'modules/common/constants/const';

export const ALLOWANCE_CONFIRMATION_BLOCKS = 1;

export const ONE_STRING = '1';
export const ZERO_STRING = '0';

export const ANKR_PAYMENT_NETWORK = isMainnet
  ? EBlockchain.eth
  : EBlockchain.eth_holesky;
