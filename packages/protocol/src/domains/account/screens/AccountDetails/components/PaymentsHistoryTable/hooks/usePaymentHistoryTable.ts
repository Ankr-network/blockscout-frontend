import { IPaymentHistoryEntity } from 'multirpc-sdk';
import { VirtualTableColumn } from 'ui';

import {
  PaymentHistoryTableTimeframe,
  PaymentType,
} from 'domains/account/types';
import { useColumns } from './useColumns';
import { usePaymentType } from './usePaymentType';
import { useTimeframe } from './useTimeframe';
import { useTransactions } from './useTransactions';

export interface PaymentHistoryTable {
  columns: VirtualTableColumn<IPaymentHistoryEntity>[];
  hasMore: boolean;
  loadMore: () => void;
  loading: boolean;
  paymentType: PaymentType;
  rows: IPaymentHistoryEntity[];
  setPaymentType: (type: PaymentType) => void;
  setTimeframe: (timeframe: PaymentHistoryTableTimeframe) => void;
  timeframe: PaymentHistoryTableTimeframe;
}

export const usePaymentHistoryTable = (): PaymentHistoryTable => {
  const [timeframe, setTimeframe] = useTimeframe();
  const [paymentType, setPaymentType] = usePaymentType();

  const {
    hasMore,
    loadMore,
    loading,
    transactions: rows,
  } = useTransactions({ timeframe, paymentType });

  const columns = useColumns();

  return {
    columns,
    hasMore,
    loadMore,
    loading,
    paymentType,
    rows,
    setPaymentType,
    setTimeframe,
    timeframe,
  };
};
