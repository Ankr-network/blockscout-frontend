import { ChainID } from '../types';

export const BSC_CHAIN_NAME = 'BNB Smart Chain';

export const BSC_CHAIN_TESTNET_NAME = 'BNB Smart Chain Chapel Testnet';

export const SUI_CHAIN_NAME = 'Sui';

export const NEAR_CHAIN_NAME = 'NEAR';

export const TRON_CHAIN_NAME = 'TRON';

export const mapChainName = (chainId: ChainID, chainName: string) => {
  if (chainId === ChainID.NEAR) {
    return NEAR_CHAIN_NAME;
  }

  if (chainId === ChainID.BSC_TESTNET_CHAPEL) {
    return BSC_CHAIN_TESTNET_NAME;
  }

  if (chainId === ChainID.BSC) {
    return BSC_CHAIN_NAME;
  }

  if (chainId === ChainID.SUI) {
    return SUI_CHAIN_NAME;
  }

  if (chainId === ChainID.TRON) {
    return TRON_CHAIN_NAME;
  }

  return chainName;
};
