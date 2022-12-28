import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';

import { Balance as AccountBalance } from 'domains/account/actions/balance/types';
import { PaymentHistoryTableTimeframe, PaymentType } from '../types';
import { accountFetchPaymentHistory } from '../actions/fetchTransactions';
import { getTransactionsRequest } from '../screens/AccountDetails/components/PaymentsHistoryTable/utils/getTransactionsRequest';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

const TIMEOUT = 30000;

export const useUpdatePaymentHistory = (
  balances: AccountBalance,
  timeframe: PaymentHistoryTableTimeframe,
  paymentType: PaymentType,
) => {
  const [fetchTransactions, , reset] = useQueryEndpoint(
    accountFetchPaymentHistory,
  );

  const amount = useRef(balances?.ankrBalance);

  const dispatch = useDispatch();

  useEffect(() => {
    const isBalancesChanged =
      balances?.ankrBalance && !balances?.ankrBalance.isEqualTo(amount.current);
    let timeoutId: NodeJS.Timeout;

    if (isBalancesChanged) {
      timeoutId = setTimeout(() => {
        reset();
        fetchTransactions(getTransactionsRequest({ timeframe, paymentType }));
        amount.current = balances.ankrBalance;
      }, TIMEOUT);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    balances?.ankrBalance,
    dispatch,
    fetchTransactions,
    paymentType,
    reset,
    timeframe,
  ]);
};
