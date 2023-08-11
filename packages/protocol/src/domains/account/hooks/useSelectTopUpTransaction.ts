import { useAppSelector } from 'store/useAppSelector';

import { selectTransaction } from '../store/accountTopUpSlice';
import { useAddress } from './useAddress';

export const useSelectTopUpTransaction = () => {
  const address = useAddress();

  return useAppSelector(state => selectTransaction(state, address));
};
