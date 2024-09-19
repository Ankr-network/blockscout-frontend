import { ChainID } from '@ankr.com/chains-list';

import { checkPrivateChainsAndGetChainId } from 'domains/chains/screens/ChainItem/components/UsageDataSection/const';

/* this mapping helps to get the correct id for using in requests for some chains with extensions */
export const checkChainsWithExtensionsAndGetChainId = (chainId: ChainID) => {
  switch (chainId) {
    case ChainID.TENET:
      return checkPrivateChainsAndGetChainId(ChainID.TENET_EVM);
    case ChainID.HORIZEN:
      return checkPrivateChainsAndGetChainId(ChainID.HORIZEN_EVM);
    case ChainID.HORIZEN_TESTNET:
      return checkPrivateChainsAndGetChainId(ChainID.HORIZEN_TESTNET_EVM);
    case ChainID.BERACHAIN:
      return checkPrivateChainsAndGetChainId(
        ChainID.BERACHAIN_GUARDED_TESTNET_EVM,
      );
    default:
      return checkPrivateChainsAndGetChainId(chainId);
  }
};
