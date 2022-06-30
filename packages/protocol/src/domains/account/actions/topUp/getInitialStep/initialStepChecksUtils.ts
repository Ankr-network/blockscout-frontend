import { ITransaction } from 'domains/account/store/accountTopUpSlice';

export const isAmountEmpty = (transaction?: ITransaction) => {
  return (
    !transaction ||
    !transaction?.amount ||
    transaction?.amount?.toString() === '0'
  );
};

export const areHashesEmpty = (transaction?: ITransaction) => {
  return (
    !transaction?.allowanceTransactionHash &&
    !transaction?.rejectAllowanceTransactionHash &&
    !transaction?.topUpTransactionHash
  );
};
