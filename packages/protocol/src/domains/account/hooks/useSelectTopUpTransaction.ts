import { useAppSelector } from 'store/useAppSelector';
import { selectTransaction } from '../store/accountTopUpSlice';
import { RootState } from 'store';
import { useAddress } from './useAddress';

export const useSelectTopUpTransaction = () => {
  const address = useAddress();

  const transaction = useAppSelector((state: RootState) =>
    selectTransaction(state, address),
  );

  return transaction;
};
