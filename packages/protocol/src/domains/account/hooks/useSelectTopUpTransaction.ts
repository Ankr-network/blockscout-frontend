import { useAppSelector } from 'store/useAppSelector';
import { RootState } from 'store';

import { selectTransaction } from '../store/accountTopUpSlice';
import { useAddress } from './useAddress';

export const useSelectTopUpTransaction = () => {
  const address = useAddress();

  const transaction = useAppSelector((state: RootState) =>
    selectTransaction(state, address),
  );

  return transaction;
};
