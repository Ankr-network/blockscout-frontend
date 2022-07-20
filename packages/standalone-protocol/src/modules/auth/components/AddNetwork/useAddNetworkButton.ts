import { useMemo, MouseEvent } from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { useAddNetwork } from 'modules/auth/hooks/useAddNetwork';
import { connectWeb3 } from 'modules/auth/actions/connectWeb3';
import { getMappedNetwork } from './AddNetworkUtils';
import { Chain } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/ChainItemHeaderTypes';

export const useAddNetworkButton = ({ chain }: { chain: Chain }) => {
  const { handleAddNetwork } = useAddNetwork();
  const dispatch = useDispatchRequest();

  const mappedNetwork = useMemo(() => getMappedNetwork(chain), [chain]);

  const handleButtonClick = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    /* stop propagation for click event to avoid parent element click */
    event.stopPropagation();

    const { error } = await dispatch(connectWeb3());

    if (error) return undefined;

    return handleAddNetwork(mappedNetwork);
  };

  return {
    mappedNetwork,
    handleButtonClick,
  };
};
