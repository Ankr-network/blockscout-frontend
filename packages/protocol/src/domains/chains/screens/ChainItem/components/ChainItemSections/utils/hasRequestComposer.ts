import { ChainID } from 'domains/chains/types';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';
import { isGroupSolanaBased } from 'modules/endpoints/utils/isGroupSolanaBased';
import { BlockchainType } from 'multirpc-sdk';

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

export const hasRequestComposer = ({
  chainId,
  group,
  isChainProtocolSwitchEnabled,
  hasPrivateAccess,
}: HasRequestComposerParams) => {
  const { chains } = group;

  const isMainnetForPremiumOnly =
    chains[0]?.type === BlockchainType.Mainnet &&
    chains[0]?.isMainnetPremiumOnly;

  const isSolana = isGroupSolanaBased(group);
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
      isGroupSolanaBased(group)) &&
    !isChainProtocolSwitchEnabled
  );
};
