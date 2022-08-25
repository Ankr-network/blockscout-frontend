import { useEffect, useRef } from 'react';

import { useDispatchRequest } from '@redux-requests/react';
import { Balance as AccountBalance } from 'domains/account/actions/balance/types';
import { fetchTransactions } from '../actions/fetchTransactions';
import { getTransactionsRequest } from '../screens/AccountDetails/components/PaymentsHistoryTable/utils/getTransactionsRequest';
import { PaymentHistoryTableTimeframe, PaymentType } from '../types';
import { useDispatch } from 'react-redux';
import { resetRequests } from '@redux-requests/core';

const actionType = fetchTransactions.toString();

const TIMEOUT = 30000;

export const useUpdatePaymentHistory = (
  balances: AccountBalance,
  timeframe: PaymentHistoryTableTimeframe,
  paymentType: PaymentType,
) => {
  const amount = useRef(balances?.ankrBalance);
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  useEffect(() => {
    const isBalancesChanged =
      balances?.ankrBalance && !balances?.ankrBalance.isEqualTo(amount.current);
    let timeoutId: NodeJS.Timeout;

    if (isBalancesChanged) {
      timeoutId = setTimeout(() => {
        dispatch(resetRequests([actionType]));
        dispatchRequest(
          fetchTransactions(getTransactionsRequest({ timeframe, paymentType })),
        );
        amount.current = balances.ankrBalance;
      }, TIMEOUT);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    balances?.ankrBalance,
    dispatchRequest,
    dispatch,
    timeframe,
    paymentType,
  ]);
};
