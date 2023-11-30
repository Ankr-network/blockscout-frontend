import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { selectTransaction } from '../store/accountTopUpSlice';

export const useSelectTopUpTransaction = () => {
  const { address: personalAddress } = useAuth();
  const { selectedGroupAddress } = useSelectedUserGroup();

  const address = selectedGroupAddress ?? personalAddress;

  return useAppSelector(state => selectTransaction(state, address));
};
