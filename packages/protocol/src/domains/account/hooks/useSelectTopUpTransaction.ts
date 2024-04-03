import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useConnectedAddress } from 'modules/billing/hooks/useConnectedAddress';

import { selectTransaction } from '../store/selectors';

export const useSelectTopUpTransaction = () => {
  const { address: personalAddress } = useAuth();
  const { connectedAddress: depositAddress } = useConnectedAddress();

  const { selectedGroupAddress } = useSelectedUserGroup();

  // TODO: pay attention to address selection in scope of tasks https://ankrnetwork.atlassian.net/browse/MRPC-4655 and https://ankrnetwork.atlassian.net/browse/MRPC-4663
  const address = selectedGroupAddress ?? depositAddress ?? personalAddress;

  return useAppSelector(state => selectTransaction(state, address));
};
