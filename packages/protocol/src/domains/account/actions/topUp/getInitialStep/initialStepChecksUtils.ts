import { ITransaction } from 'domains/account/store/accountTopUpSlice';

export const areHashesEmpty = (transaction?: ITransaction) => {
  return (
    !transaction?.allowanceTransactionHash &&
    !transaction?.rejectAllowanceTransactionHash &&
    !transaction?.topUpTransactionHash
  );
};
