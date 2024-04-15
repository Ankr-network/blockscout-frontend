import { VirtualTableColumn } from 'uiKit/VirtualTable';
import {
  IPaymentHistoryTableEntity,
  PaymentHistoryTableTimeframe,
  PaymentType,
} from 'domains/account/types';

import { useColumns } from './useColumns';
import { usePaymentType } from './usePaymentType';
import { useTimeframe } from './useTimeframe';
import { useTransactions } from './useTransactions';

export interface PaymentHistoryTable {
  columns: VirtualTableColumn<IPaymentHistoryTableEntity>[];
  hasMore: boolean;
  initializing: boolean;
  isLoading: boolean;
  loadMore: () => void;
  paymentType: PaymentType;
  rows: IPaymentHistoryTableEntity[];
  setPaymentType: (type: PaymentType) => void;
  setTimeframe: (timeframe: PaymentHistoryTableTimeframe) => void;
  timeframe: PaymentHistoryTableTimeframe;
}

export const usePaymentHistoryTable = (): PaymentHistoryTable => {
  const [timeframe, setTimeframe] = useTimeframe();
  const [paymentType, setPaymentType] = usePaymentType();

  const { hasMore, initializing, isLoading, loadMore, transactions } =
    useTransactions({ timeframe, paymentType });

  const columns = useColumns();

  return {
    columns,
    hasMore,
    initializing,
    isLoading,
    loadMore,
    paymentType,
    rows: transactions,
    setPaymentType,
    setTimeframe,
    timeframe,
  };
};
