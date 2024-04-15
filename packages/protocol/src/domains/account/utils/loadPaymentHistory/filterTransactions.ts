import BigNumber from 'bignumber.js';

import { IPaymentHistoryTableEntity } from 'domains/account/types';

export const filterTransactions = (
  transactions: IPaymentHistoryTableEntity[],
): IPaymentHistoryTableEntity[] =>
  transactions.filter(
    ({ amountAnkr, type }) =>
      type !== 'TRANSACTION_TYPE_DEDUCTION' &&
      !(
        type === 'TRANSACTION_TYPE_WITHDRAW_ADJUST' &&
        new BigNumber(amountAnkr).isEqualTo(0)
      ),
  );
