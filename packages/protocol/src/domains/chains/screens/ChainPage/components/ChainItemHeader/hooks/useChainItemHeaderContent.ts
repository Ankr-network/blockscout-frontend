import { useMemo } from 'react';
import { Chain, ChainID } from '@ankr.com/chains-list';

import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { TRON_RESET_API_GROUP_ID } from 'domains/auth/components/AddNetwork/const';
import { getEndpointsGroup } from 'domains/chains/screens/ChainPage/utils/getEndpointsGroup';
import { isEVMBased } from 'modules/chains/utils/isEVMBased';

import { useChainItemPlaceholder } from '../useChainItemPlaceholder';
import { hasGroupSelector as checkHasGroupSelector } from '../utils/hasGroupSelector';

interface IUseChainItemHeaderContentProps {
  chain: Chain;
  group: EndpointGroup;
  groupID: ChainGroupID;
  isMetamaskButtonHidden?: boolean;
  isMultiChain: boolean;
  isChainProtocolSwitchEnabled: boolean;
}

export const useChainItemHeaderContent = ({
  chain,
  group,
  groupID,
  isChainProtocolSwitchEnabled,
  isMetamaskButtonHidden,
  isMultiChain,
}: IUseChainItemHeaderContentProps) => {
  const endpointsGroup = useMemo(
    () => getEndpointsGroup({ group, isChainProtocolSwitchEnabled }),
    [group, isChainProtocolSwitchEnabled],
  );

  const { placeholder } = useChainItemPlaceholder(isMultiChain);
  const hasGroupSelector = useMemo(
    () => checkHasGroupSelector(chain.id, groupID),
    [chain.id, groupID],
  );

  const isTronRestApi = useMemo(
    () => chain.id === ChainID.TRON && group.id === TRON_RESET_API_GROUP_ID,
    [chain, group],
  );

  const hasMetamaskButton =
    (isEVMBased(chain.id) || !isTronRestApi) &&
    !isChainProtocolSwitchEnabled &&
    !isMetamaskButtonHidden;

  return {
    endpointsGroup,
    placeholder,
    hasGroupSelector,
    hasMetamaskButton,
  };
};
