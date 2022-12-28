import { IPaymentHistoryEntity } from 'multirpc-sdk';

import {
  PaymentHistoryTableTimeframe,
  PaymentHistoryTableTimeframeBorders,
  PaymentType,
} from 'domains/account/types';

export interface PaymentHistory {
  hasMore: boolean;
  initializing: boolean;
  isLoading: boolean;
  loadMore: () => void;
  transactions: IPaymentHistoryEntity[];
}

export interface PaymentHistoryParams {
  borders?: PaymentHistoryTableTimeframeBorders;
  paymentType: PaymentType;
  timeframe: PaymentHistoryTableTimeframe;
}

export interface PaymentHistoryRequestParams extends PaymentHistoryParams {
  offset: number;
}

export type TransactionsDownloader = (timestamp: string) => Promise<void>;
