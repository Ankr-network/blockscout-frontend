import { useMemo } from 'react';

import { useAddNetwork } from 'domains/auth/hooks/useAddNetwork';

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

  const { chainId, networkConfiguration } = useMemo(
    () =>
      getNetworkParams({ chain, chainType, chainSubType, group, isEnterprise }),
    [chain, chainType, chainSubType, group, isEnterprise],
  );

  if (!networkConfiguration) return null;

  return (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    /* stop propagation for click event to avoid parent element click */
    event.preventDefault();
    event.stopPropagation();

    return handleAddNetwork(networkConfiguration, chainId);
  };
};
