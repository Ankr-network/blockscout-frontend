import { useAppSelector } from 'store/useAppSelector';
import { selectTransaction } from '../store/accountWithdrawSlice';
import { RootState } from 'store';
import { useAddress } from './useAddress';

export const useSelectWithdrawalTransaction = () => {
  const address = useAddress();

  const transaction = useAppSelector((state: RootState) =>
    selectTransaction(state, address),
  );

  return transaction;
};
