import { IPaymentHistoryEntityType } from '../account';
import { Network, Web3Address } from '../common';

export interface ITransactionsEntity {
  amount?: string;
  amountAnkr: string;
  amountUsd: string;
  blockchain: Network;
  timestamp: string;
  type: IPaymentHistoryEntityType;
}

export interface ITransactionsRequest {
  address: Web3Address;
  blockchain?: string;
  cursor: number;
  limit: number;
  order_by?: string;
}

export interface ITransactionsResponse {
  transactions: ITransactionsEntity[];
  cursor: string;
}

export interface IBalancesEntity {
  address: Web3Address;
  amount: string;
  amountAnkr: string;
  amountUsd: string;
  voucherAmount: string;
  reference: string;
}

export interface IBalancesRequest {
  search?: string;
  cursor?: number;
  limit?: number;
  order_by?: string;
  sort?: 'asc' | 'desc';
}

export interface IBalancesResponse {
  balances: IBalancesEntity[];
  cursor: string; // TODO: backend not sending yet
}

export interface IUsageDetailEntity {
  count: string;
  method: string;
}
export interface IUsageEntity {
  blockchain: string;
  details: IUsageDetailEntity[];
}

export interface IStatementRequest {
  address: Web3Address;
  day_offset: string;
}

export interface IStatementResponse {
  statement: {
    user: Web3Address;
    usage?: IUsageEntity[];
  };
}

export interface IAddVoucherCreditsRequest {
  address: Web3Address;
  amountType: 'ankr' | 'usd' | 'credit';
  amount: string;
  reasonId: string;
}

export interface IAddVoucherCreditsResponse {
  success: boolean;
}

export interface IUpdateVoucherCreditsRequest {
  address: Web3Address;
  amountType: 'ankr' | 'usd' | 'credit';
  amount: string;
  reasonId: string;
}

export interface IUpdateVoucherCreditsResponse {
  success: boolean;
}
