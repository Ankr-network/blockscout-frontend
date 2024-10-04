import BigNumber from 'bignumber.js';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';

import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useAppSelector } from 'store/useAppSelector';

import { PaymentHistoryTableTimeframe, PaymentType } from '../types';
import { fetchPaymentHistory } from '../actions/fetchPaymentHistory';
import { getTransactionsRequest } from '../screens/BillingPage/components/PaymentsHistoryTable/utils/getTransactionsRequest';
import { selectAnkrBalance } from '../store/selectors';

const TIMEOUT = 30000;

export const useUpdatePaymentHistory = (
  timeframe: PaymentHistoryTableTimeframe,
  paymentType: PaymentType,
) => {
  const ankrBalance = useAppSelector(selectAnkrBalance);
  const [fetchTransactions, , reset] = useQueryEndpoint(fetchPaymentHistory);

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const amount = useRef(ankrBalance);

  const dispatch = useDispatch();

  useEffect(() => {
    const isBalancesChanged =
      ankrBalance && !new BigNumber(ankrBalance).isEqualTo(amount.current);
    let timeoutId: NodeJS.Timeout;

    if (isBalancesChanged) {
      timeoutId = setTimeout(() => {
        reset();
        fetchTransactions({
          ...getTransactionsRequest({ timeframe, paymentType }),
          group,
        });
        amount.current = ankrBalance;
      }, TIMEOUT);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    ankrBalance,
    dispatch,
    fetchTransactions,
    paymentType,
    reset,
    timeframe,
    group,
  ]);
};
