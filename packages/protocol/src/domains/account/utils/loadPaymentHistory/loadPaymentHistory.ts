import { PaymentHistory, PaymentHistoryParams } from 'domains/account/types';

import { executeLoading } from './executeLoading';

export const loadPaymentHistory = async ({
  deductionsCursor = 0,
  from,
  limit,
  to,
  transactionsCursor = 0,
  myBundlesPaymentsCursor = 0,
  types = [],
  group,
}: PaymentHistoryParams): Promise<PaymentHistory> => {
  const {
    deductionsCursor: nextDeductionsCursor,
    list,
    transactionsCursor: nextTransactionsCursor,
    myBundlesPaymentsCursor: nextMyBundlesPaymentsCursor,
  } = await executeLoading({
    deductionsCursor,
    from,
    limit,
    to,
    transactionsCursor,
    types,
    group,
    myBundlesPaymentsCursor,
  });

  return {
    deductionsCursor:
      nextDeductionsCursor === -1
        ? nextDeductionsCursor
        : nextDeductionsCursor + deductionsCursor,
    list,
    transactionsCursor:
      nextTransactionsCursor === -1
        ? nextTransactionsCursor
        : nextTransactionsCursor + transactionsCursor,
    myBundlesPaymentsCursor:
      nextMyBundlesPaymentsCursor === -1
        ? nextMyBundlesPaymentsCursor
        : nextMyBundlesPaymentsCursor + myBundlesPaymentsCursor,
  };
};
