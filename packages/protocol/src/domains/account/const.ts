import { EBlockchain } from 'multirpc-sdk';

import { isMainnet } from 'modules/common/constants/const';

export const ANKR_TOP_UP_NETWORK = isMainnet
  ? EBlockchain.eth
  : EBlockchain.eth_holesky;
