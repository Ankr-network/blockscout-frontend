export type BigInt = string;
export type UUID = string;
export type Web3Address = string;
export type Base64 = string;
export type PrefixedHex = string;

export type Network =
  | 'solana'
  | 'near'
  | 'celo'
  | 'avalanche'
  | 'fantom'
  | 'polygon'
  | 'arbitrum'
  | 'bsc'
  | 'iotex'
  | 'nervos'
  | 'eth';

export type TBlockchain = 'BLOCKCHAIN_WEB3' | 'BLOCKCHAIN_SUBSTRATE';

export type TCrypto =
  | 'CRYPTO_ECDSA_SECP256K1'
  | 'CRYPTO_ECDSA_SECP256R1'
  | 'CRYPTO_BLST_BLS12381'
  | 'CRYPTO_SCHNORR_SECP256K1'
  | 'CRYPTO_EDDSA_ED25519';

export type TPlayerStatus = 'PLAYER_STATUS_ACTIVE' | 'PLAYER_STATUS_DISABLED';

export interface IPlayer {
  id: string;
  x509_cert: string;
  status: TPlayerStatus;
  committee: string;
  created: number;
  changed: number;
}

export type TProposalStatus =
  | 'PROPOSAL_STATUS_QUEUED'
  | 'PROPOSAL_STATUS_EXECUTING'
  | 'PROPOSAL_STATUS_DONE'
  | 'PROPOSAL_STATUS_FAILED';

export type TProposalType =
  | 'PROPOSAL_TYPE_GENERATE_THRESHOLD_KEY'
  | 'PROPOSAL_TYPE_NOTARIZE_TRANSACTION'
  | 'PROPOSAL_TYPE_NOTARIZE_BLOCK'
  | 'PROPOSAL_TYPE_ISSUE_JWT_TOKEN';

export interface IProposal {
  id: UUID;
  status: TProposalStatus;
  type: TProposalType;
  message: Base64;
  author: UUID;
  index: string;
}

export type TThresholdKeyStatus =
  | 'THRESHOLD_KEY_STATUS_PENDING'
  | 'THRESHOLD_KEY_STATUS_GENERATED'
  | 'THRESHOLD_KEY_STATUS_FAILED';

export type TThresholdKeyRole =
  | 'THRESHOLD_KEY_ROLE_NOTARIZE'
  | 'THRESHOLD_KEY_ROLE_SIGN'
  | 'THRESHOLD_KEY_ROLE_TRANSACT'
  | 'THRESHOLD_KEY_ROLE_ISSUE';

export interface IThresholdKey {
  id: UUID;
  status: TThresholdKeyStatus;
  crypto: TCrypto;
  public_key: Base64;
  players: UUID[];
  threshold: number;
  proposal: UUID;
  party: string;
}

export type TNotarizedTransactionStatus =
  | 'NOTARIZED_TRANSACTION_STATUS_CONFIRMED'
  | 'NOTARIZED_TRANSACTION_STATUS_REPLACED'
  | 'NOTARIZED_TRANSACTION_STATUS_ORPHANED'
  | 'NOTARIZED_TRANSACTION_STATUS_REVERTED';

export interface INotarizedTransaction {
  id: UUID;
  status: TNotarizedTransactionStatus;
  blockchain: TBlockchain;
  transaction_hash: Base64;
  block_number: BigInt;
  block_hash: Base64;
  transaction_index: number;
  receipt_hash: Base64;
  transferred_amount: BigInt;
  chain_id: Base64;
  threshold_key: UUID;
  proposal: UUID;
  payload: Base64;
  signature: Base64;
}

export enum EmailConfirmationStatus {
  PENDING = 'EMAIL_CONFIRMATION_STATUS_PENDING',
  DELETED = 'EMAIL_CONFIRMATION_STATUS_DELETED',
  CONFIRMED = 'EMAIL_CONFIRMATION_STATUS_CONFIRMED',
}

export type TJwtTokenStatus =
  | 'JWT_TOKEN_STATUS_ACTIVE'
  | 'JWT_TOKEN_STATUS_EXPIRED'
  | 'JWT_TOKEN_STATUS_REVOKED';

export type TJwtTokenType =
  | 'JWT_TOKEN_TYPE_UNKNOWN'
  | 'JWT_TOKEN_TYPE_USER'
  | 'JWT_TOKEN_TYPE_ADMIN';

export enum Tier {
  PAYG,
  Premium,
}

export interface IJwtToken {
  id: PrefixedHex;
  threshold_key: UUID;
  status: TJwtTokenStatus;
  type: TJwtTokenType;
  owner_address: Web3Address;
  signing_data: Base64;
  public_key: Base64;
  signed_token: Base64;
  expires_at: number;
  endpoint_token: Base64;
  tier: Tier;
}

export enum Token {
  avax = 'avax',
  eth = 'eth',
  ftm = 'ftm',
  ksm = 'ksm',
  sol = 'sol',
  stake = 'stake',
}

export interface IConfig {
  ankrTokenContractAddress: PrefixedHex;
  ankrWalletContractAddress: PrefixedHex;
  confirmationBlocks: number;
  privateRpcUrl: string;
  privateWsUrl: string;
  publicRpcUrl: string;
  publicWsUrl: string;
  walletPrivateUrl: string;
  walletPublicUrl: string;
  workerUrl: string;
  accountUrl: string;
  backofficeUrl: string;

  payAsYouGoAnkrTokenContractAddress: string;
  payAsYouGoContractAddress: string;
}

export type Environment = 'local' | 'staging' | 'prod';
