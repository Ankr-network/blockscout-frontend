import { useMemo, MouseEvent } from 'react';

import { useAddNetwork } from '../../hooks/useAddNetwork';
import { getMappedNetwork } from './AddNetworkUtils';
import { Chain } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/ChainItemHeaderTypes';
import { useAppDispatch } from 'store/useAppDispatch';
import { connectWeb3 } from 'modules/auth/actions/connectWeb3';

export const useAddNetworkButton = ({ chain }: { chain: Chain }) => {
  const { handleAddNetwork } = useAddNetwork();
  const dispatch = useAppDispatch();

  const mappedNetwork = useMemo(() => getMappedNetwork(chain), [chain]);

  const handleButtonClick = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    /* stop propagation for click event to avoid parent element click */
    event.stopPropagation();

    await dispatch(connectWeb3());

    return handleAddNetwork(mappedNetwork);
  };

  return {
    mappedNetwork,
    handleButtonClick,
  };
};
