import { IPaymentHistoryEntityType } from '../account';
import { EmailConfirmationStatus, Network, Web3Address } from '../common';

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

export interface IEmailBindingEntity {
  address: Web3Address;
  email: string;
  status: EmailConfirmationStatus;
}

export interface IEmailBindingsRequest {
  cursor?: string;
  limit?: number;
  filter_type?: 'email' | 'address';
  filter?: string;
}

export interface IEmailBindingsResponse {
  bindings?: IEmailBindingEntity[];
  cursor: string;
}

export interface ICreateTestClientRequest {
  address: Web3Address;
  duration: number;
}

export interface ICreateTestClientResponse {
  token: string,
  id: string,
  address: Web3Address,
  tier: number,
  roles: string,
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

export type BlockchainFeature = 'rpc' | 'ws';

export enum BlockchainType {
  Mainnet = 'mainnet',
  Extension = 'extension',
  Testnet = 'testnet',
  Devnet = 'devnet',
}

export interface IBlockchainEntity {
  coinName: string;
  extends?: string;
  id: string;
  features: BlockchainFeature[];
  name: string;
  paths?: string[];
  stats?: {
    reqs: number;
  };
  type: BlockchainType;
}

export interface ICountersEntity {
  hourly: number;
  daily: number;
  monthly: number;
  delta: number;
  timestamp: number;
  user: string;
  address?: Web3Address;
  ttl?: number;
  hash?: string;
}

export interface ICountersResponse {
  result?: ICountersEntity[];
}

export interface INodeEntity {
  id: string;
  blockchain: string;
  scheme: string;
  requestUrl: string;
  websocketUrl?: string;
  weight: number;
  continent: string;
  country: string;
  organization: string;
  city: string;
  features: string[];
  isArchive: boolean;
}
