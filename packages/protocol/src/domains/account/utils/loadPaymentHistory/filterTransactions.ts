import BigNumber from 'bignumber.js';
import { IPaymentHistoryEntity } from 'multirpc-sdk';

export const filterTransactions = (
  transactions: IPaymentHistoryEntity[],
): IPaymentHistoryEntity[] =>
  transactions.filter(
    ({ amountAnkr, type }) =>
      type !== 'TRANSACTION_TYPE_DEDUCTION' &&
      !(
        type === 'TRANSACTION_TYPE_WITHDRAW_ADJUST' &&
        new BigNumber(amountAnkr).isEqualTo(0)
      ),
  );
