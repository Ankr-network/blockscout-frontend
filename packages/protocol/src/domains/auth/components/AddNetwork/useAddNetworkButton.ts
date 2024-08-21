import { useMemo } from 'react';

import { useAddNetwork } from 'domains/auth/hooks/useAddNetwork';
import { useAppSelector } from 'store/useAppSelector';
import { selectPublicChainById } from 'modules/chains/store/selectors';

import { getNetworkParams } from './AddNetworkUtils';
import { IUseAddNetworkButtonParams } from './types';

export const useAddNetworkButton = ({
  chain,
  chainSubType,
  chainType,
  group,
  isEnterprise,
}: IUseAddNetworkButtonParams) => {
  const { handleAddNetwork } = useAddNetwork();

  const publicChain = useAppSelector(state =>
    selectPublicChainById(state, chain.id),
  );

  const { chainId, networkConfiguration } = useMemo(
    () =>
      getNetworkParams({
        chain: isEnterprise ? chain : publicChain || chain,
        chainType,
        chainSubType,
        group,
        isEnterprise,
      }),
    [chain, publicChain, chainType, chainSubType, group, isEnterprise],
  );

  if (!networkConfiguration) return undefined;

  return (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    /* stop propagation for click event to avoid parent element click */
    event.preventDefault();
    event.stopPropagation();

    return handleAddNetwork(networkConfiguration, chainId);
  };
};
