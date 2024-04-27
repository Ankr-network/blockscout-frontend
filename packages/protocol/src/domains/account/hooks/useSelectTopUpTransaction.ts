import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useConnectedAddress } from 'modules/billing/hooks/useConnectedAddress';

import { selectTransaction } from '../store/selectors';

export const useSelectTopUpTransaction = () => {
  const { address: personalAddress } = useAuth();
  const { connectedAddress: depositAddress } = useConnectedAddress();

  const address = depositAddress ?? personalAddress;

  return useAppSelector(state => selectTransaction(state, address));
};
