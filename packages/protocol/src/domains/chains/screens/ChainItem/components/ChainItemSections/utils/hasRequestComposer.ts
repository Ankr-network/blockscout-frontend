import { ChainID } from 'modules/chains/types';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';
import { isGroupSolanaBased } from 'modules/endpoints/utils/isGroupSolanaBased';

export interface HasRequestComposerParams {
  chainId: ChainID;
  group: EndpointGroup;
  hasBeacon: boolean;
}

const isAvalancheChain = (id: ChainGroupID) =>
  id === ChainGroupID.C_CHAIN ||
  id === ChainGroupID.P_CHAIN ||
  id === ChainGroupID.X_CHAIN;

export const hasRequestComposer = ({
  chainId,
  group,
  hasBeacon,
}: HasRequestComposerParams) =>
  (chainId === ChainID.MULTICHAIN ||
    chainId === ChainID.TRON ||
    chainId === ChainID.NEAR ||
    isGroupEvmBased(group) ||
    isAvalancheChain(group.id) ||
    isGroupSolanaBased(group)) &&
  !hasBeacon;
