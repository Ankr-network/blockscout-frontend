import { useMemo } from 'react';

import { getNetworkParams } from './AddNetworkUtils';
import { useAddNetwork } from 'domains/auth/hooks/useAddNetwork';
import { IUseAddNetworkButtonParams } from './types';

export const useAddNetworkButton = ({
  chain,
  chainType,
  group,
}: IUseAddNetworkButtonParams) => {
  const { handleAddNetwork } = useAddNetwork();

  const { chainId, networkConfiguration } = useMemo(
    () => getNetworkParams({ chain, chainType, group }),
    [chain, chainType, group],
  );

  if (!networkConfiguration) return null;

  return (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    /* stop propagation for click event to avoid parent element click */
    event.preventDefault();
    event.stopPropagation();

    return handleAddNetwork(networkConfiguration, chainId);
  };
};
