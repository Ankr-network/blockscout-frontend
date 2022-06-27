import { ChainGroupID } from 'modules/endpoints/types';

const { ETH_MAINNET, NERVOS_EVM, STANDARD_EVM } = ChainGroupID;

export const evmGroups: ChainGroupID[] = [
  ETH_MAINNET,
  NERVOS_EVM,
  STANDARD_EVM,
];
