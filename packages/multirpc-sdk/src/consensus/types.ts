import {
  Base64,
  IJwtToken,
  INotarizedTransaction,
  IPlayer,
  IProposal,
  IThresholdKey,
  PrefixedHex,
  TCrypto,
  TJwtTokenType,
  TThresholdKeyRole,
  UUID,
  Web3Address,
} from '../common';

export interface IGenerateThresholdKeyData {
  threshold_key: IThresholdKey;
}

export interface IGenerateThresholdKeyRequest {
  crypto: TCrypto;
  party: string;
  players: UUID[];
  roles: TThresholdKeyRole[];
  threshold: number;
}

export interface IGetJwtTokensData {
  has_more?: boolean;
  jwt_tokens: IJwtToken[];
};

export interface IGetNotarizedTransactionsData {
  has_more?: boolean;
  notarized_transactions: INotarizedTransaction[];
};

export interface IGetPlayersData {
  has_more?: boolean;
  players: IPlayer[];
}

export interface IGetProposalsData {
  has_more?: boolean;
  proposals: IProposal[];
}

export interface IGetThresholdKeyData {
  deposit_addresses: Record<PrefixedHex, PrefixedHex>;
  threshold_key: IThresholdKey;
};

export interface IGetThresholdKeysData {
  has_more?: boolean;
  threshold_keys: IThresholdKey[];
};

export interface IIssueJwtTokenData {
  jwt_token: IJwtToken;
}

export interface IIssueJwtTokenRequest {
  jwt_token: PrefixedHex | Web3Address;
  public_key: Base64;
  threshold_key: UUID;
  token_type: TJwtTokenType;
};

export interface IJwtTokenRequest {
  public_key: Base64;
  threshold_key: UUID;
  transaction_hash: PrefixedHex;
};

export interface INotarizeTransactionData {
  notarized_transaction: INotarizedTransaction;
}

export interface INotarizeTransactionRequest {
  block_number?: number;
  chain_id: Base64;
  threshold_key: UUID;
  transaction_index?: number;
  transaction_hash: Base64;
}

export interface IRequestJwtTokenData {
  jwt_token: IJwtToken;
}

export interface IThresholdKeysFilter {
  name?: string;
}

export type JwtTokens = [IJwtToken[], boolean];

export type NotarizedTransactions = [INotarizedTransaction[], boolean];

export type Players = [IPlayer[], boolean];

export type Proposals = [IProposal[], boolean];

export type ThresholdKeys = [IThresholdKey[], boolean];