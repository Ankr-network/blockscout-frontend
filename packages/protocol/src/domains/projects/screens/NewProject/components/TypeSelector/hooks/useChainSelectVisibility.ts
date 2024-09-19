import { useEffect } from 'react';
import { ChainType } from '@ankr.com/chains-list';

import { useChainProtocolContext } from 'domains/chains/screens/ChainItem/hooks/useChainProtocolContext';
// TODO: we need to remove it to some chains common folder
import { ChainTypeItem } from 'domains/chains/screens/ChainItem/PrivateChainItemQuery/components/PrivateChainItem/hooks/usePrivateChainItem';
import { EndpointGroup } from 'modules/endpoints/types';

interface ChainSelectVisibilityHookProps {
  chainTypes: ChainTypeItem[];
  chainType: ChainType;
  groups: EndpointGroup[];
  isTestnetOnlyChain?: boolean;
  selectType: (id: ChainType) => void;
}

export const useChainSelectVisibility = ({
  chainType,
  chainTypes,
  groups,
  isTestnetOnlyChain,
  selectType,
}: ChainSelectVisibilityHookProps) => {
  const { protocolGroup } = useChainProtocolContext();

  const withChainTypeSelector = chainTypes.length > 1;
  const withGroupSelector = groups.length > 1;

  const isGroupSelectorVisible =
    withGroupSelector || withChainTypeSelector || Boolean(protocolGroup);

  useEffect(() => {
    if (isTestnetOnlyChain && chainType === ChainType.Mainnet) {
      selectType(ChainType.Testnet);
    }
  }, [isTestnetOnlyChain, chainType, selectType]);

  return isGroupSelectorVisible;
};
