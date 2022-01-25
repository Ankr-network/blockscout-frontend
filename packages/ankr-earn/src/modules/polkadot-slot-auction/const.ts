import { isMainnet } from 'modules/common/const';
import { BlockchainNetworkId } from 'modules/common/types';

export const validETHChainId: BlockchainNetworkId = isMainnet
  ? BlockchainNetworkId.mainnet
  : BlockchainNetworkId.goerli;
