import {
  IPaymentHistoryEntityType,
  PrivateStats,
  PrivateStatsInterval
} from '../account';
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
  amount: string; // deprecated. use creditAnkrAmount
  amountAnkr: string;
  amountUsd: string;
  voucherAmount: string; // deprecated. use creditVoucherAmount
  reference: string;
  creditAnkrAmount: string;
  creditVoucherAmount: string;
  creditUsdAmount: string;
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
  name?: string;
  email?: string;
}

export interface ICreateTestClientResponse {
  token: string,
  id: string,
  address: Web3Address,
  tier: number,
  roles: string,
  name?: string,
  email?: string,
}

export interface IUserStatsRequest {
  address: Web3Address;
  interval: PrivateStatsInterval;
  current?: boolean; // set true if current day stats need to be included
}

export type IUserStatsResponse = PrivateStats;

export interface IUsageDetailEntity {
  count: string;
  method: string;
  totalCost: string;
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

export type IAmountType = 'ankr' | 'usd' | 'credit';

export interface IAddVoucherCreditsRequest {
  address: Web3Address;
  amountType: IAmountType;
  amount: string;
  reasonId: string;
}

export interface IAddVoucherCreditsResponse {
  success: boolean;
}

export interface IUpdateVoucherCreditsRequest {
  address: Web3Address;
  amountType: IAmountType;
  amount: string;
  reasonId: string;
}

export interface IUpdateVoucherCreditsResponse {
  success: boolean;
}

export interface IGetUserTotalRequest {
  address: Web3Address;
}
interface ChainTotal {
  totalCost: string,
  totalCount: string
}
export interface IGetUserTotalResponse {
  blockchainsInfo: {
    blockchains?: {
      avalanche?: ChainTotal,
      bsc?: ChainTotal,
      bsc_testnet_chapel?: ChainTotal,
      celo?: ChainTotal,
      eth?: ChainTotal,
      eth_sepolia?: ChainTotal,
      fantom?: ChainTotal,
      harmony?: ChainTotal,
      iotex_testnet?: ChainTotal,
      moonbeam?: ChainTotal,
      near?: ChainTotal,
      nervos_ckb?: ChainTotal,
      optimism?: ChainTotal,
      polygon?: ChainTotal,
      syscoin?: ChainTotal,
      tron?: ChainTotal
    },
    startedMs?: string,
    totalCost?: string,
    totalCount?: string,
  }
}

export interface IUserProfileEntity {
  id: string;
  address: string;
  comment?: string;
  companyType?: string;
  name?: string;
}

export interface IUserProfileResponse {
  user: IUserProfileEntity;
}

export interface IGetUserProfileRequest {
  address: Web3Address;
}
export type IGetUserProfileResponse = IUserProfileResponse;

export interface IUpdateUserProfileRequest {
  address: Web3Address;
  comment?: string;
  companyType?: string;
  name?: string;
}
export type IUpdateUserProfileResponse = IUserProfileResponse;

export interface IGetUserRevenueRequest {
  address: Web3Address;
}

export interface IGetUserRevenueResponse {
  creditsAmount: string,
  usdAmount: string,
  ankrAmount: string,
  usdFact: string,
  ankrFact: string
}

export type BlockchainFeature = 'rpc' | 'ws';

export enum BlockchainType {
  Mainnet = 'mainnet',
  Extension = 'extension',
  Testnet = 'testnet',
  Devnet = 'devnet',
  Customized = 'customized',
}

export interface IBlockchainEntity {
  coinName: string;
  extends?: string;
  id: string;
  features: BlockchainFeature[];
  name: string;
  paths?: string[];
  premiumOnly?: boolean;
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

export interface ICountersEntityMapped extends ICountersEntity {
  createdAt: Date;
}

export interface ICountersRequest {
  limit?: number
  cursor?: string;
}

export interface ICountersResponse {
  result: ICountersEntity[];
  cursor?: string;
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
