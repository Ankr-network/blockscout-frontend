import { isMainnet } from 'modules/common/const';
import { EEthereumNetworkId } from 'modules/common/types';

export const validETHChainId = isMainnet
  ? EEthereumNetworkId.mainnet
  : EEthereumNetworkId.goerli;
