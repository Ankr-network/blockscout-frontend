import {
  IPaymentHistoryTableEntity,
  PaymentHistoryTableTimeframe,
  PaymentHistoryTableTimeframeBorders,
  PaymentType,
} from 'domains/account/types';

export interface PaymentHistory {
  hasMore: boolean;
  initializing: boolean;
  isLoading: boolean;
  loadMore: () => void;
  transactions: IPaymentHistoryTableEntity[];
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

export enum ECurrencySymbol {
  ankr = 'ANKR',
  usdt = 'USDT',
  usdc = 'USDC',
  usd = '$',
}
