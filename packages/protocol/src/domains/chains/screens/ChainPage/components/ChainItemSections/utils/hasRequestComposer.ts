import { EBlockchainType, ChainID } from '@ankr.com/chains-list';

import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';
import { isGroupSolanaBased } from 'modules/endpoints/utils/isGroupSolanaBased';

export interface HasRequestComposerParams {
  chainId: ChainID;
  group: EndpointGroup;
  isChainProtocolSwitchEnabled: boolean;
  hasPrivateAccess?: boolean;
}

const isAvalancheChain = (id: ChainGroupID) =>
  id === ChainGroupID.C_CHAIN ||
  id === ChainGroupID.P_CHAIN ||
  id === ChainGroupID.X_CHAIN;

const isTronRestApi = (chainID: ChainID, groupID: ChainGroupID) =>
  chainID === ChainID.TRON && groupID === ChainGroupID.REST_API;

const isArbitrumTestnet = (chainId: ChainID) =>
  chainId === ChainID.ARBITRUM_TESTNET || chainId === ChainID.ARBITRUM_SEPOLIA;

export const hasRequestComposer = ({
  chainId,
  group,
  hasPrivateAccess,
  isChainProtocolSwitchEnabled,
}: HasRequestComposerParams) => {
  const { chains } = group;

  const isMainnetForPremiumOnly =
    chains[0]?.type === EBlockchainType.Mainnet &&
    chains[0]?.isMainnetPremiumOnly;

  const isSolana = isGroupSolanaBased(group.id);
  const shouldHideRequestComposerForFree =
    isMainnetForPremiumOnly && !hasPrivateAccess;

  if (isSolana && shouldHideRequestComposerForFree) {
    return false;
  }

  return (
    (chainId === ChainID.MULTICHAIN ||
      chainId === ChainID.NEAR ||
      isTronRestApi(chainId, group.id) ||
      isGroupEvmBased(group) ||
      isAvalancheChain(group.id) ||
      isGroupSolanaBased(group.id)) &&
    !isChainProtocolSwitchEnabled &&
    !isArbitrumTestnet(group.chains[0].id)
  );
};
