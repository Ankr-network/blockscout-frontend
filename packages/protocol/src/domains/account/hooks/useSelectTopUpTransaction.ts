import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { selectTransaction } from '../store/accountTopUpSlice';

export const useSelectTopUpTransaction = () => {
  const { address } = useAuth();

  return useAppSelector(state => selectTransaction(state, address));
};
