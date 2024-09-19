import BigNumber from 'bignumber.js';

export enum EBlockchain {
  arbitrum = 'arbitrum',
  avalanche = 'avalanche',
  base = 'base',
  bsc = 'bsc',
  eth = 'eth',
  fantom = 'fantom',
  flare = 'flare',
  gnosis = 'gnosis',
  linea = 'linea',
  optimism = 'optimism',
  polygon = 'polygon',
  polygon_zkevm = 'polygon_zkevm',
  rollux = 'rollux',
  scroll = 'scroll',
  syscoin = 'syscoin',
  avalanche_fuji = 'avalanche_fuji',
  eth_goerli = 'eth_goerli',
  eth_holesky = 'eth_holesky',
  optimism_testnet = 'optimism_testnet',
  polygon_mumbai = 'polygon_mumbai',
  arbitrum_sepolia = 'arbitrum_sepolia',
  fantom_testnet = 'fantom_testnet',
  bsc_testnet_chapel = 'bsc_testnet_chapel',
}

export type BigInt = string;
export type UUID = string;
export type Web3Address = string;
export type Base64 = string;
export type PrefixedHex = string;

export type TContractAddresses = {
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
};

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
  block_number: bigint;
  block_hash: Base64;
  transaction_index: number;
  receipt_hash: Base64;
  transferred_amount: bigint;
  chain_id: Base64;
  threshold_key: UUID;
  proposal: UUID;
  payload: Base64;
  signature: Base64;
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
}

export interface WorkerTokenData {
  signedToken: Base64;
  userEndpointToken: Base64;
  tier: Tier;
}

export interface JwtTokenFullData {
  jwtToken?: IJwtToken;
  workerTokenData?: WorkerTokenData;
}

export enum Token {
  ANKR = 'ANKR',
  ETH = 'ETH',
  USDT = 'USDT',
  USDC = 'USDC',
}

export interface IConfig {
  ankrTokenContractAddress: PrefixedHex;
  confirmationBlocks: number;
  publicEnterpriseRpcUrl: string;
  enterpriseRpcUrl: string;
  enterpriseWsUrl: string;
  privateRpcUrl: string;
  privateWsUrl: string;
  publicRpcUrl: string;
  consensusUrl: string;
  workerUrl: string;
  accountUrl: string;
  backofficeUrl: string;
  uAuthUrl: string;

  payAsYouGoAnkrTokenContractAddress: string;
  payAsYouGoContractAddress: string;
  payAsYouGoContractCreationBlockNumber: number;
  premiumPlanContractCreationBlockNumber: number;
  advancedApiUrl: string;
}

export type Environment = 'staging' | 'prod';

export type BlockchainID = string;

export type Timeframe = '1h' | '24h' | '7d' | '30d';

export interface ISetAllowanceParams extends IAllowanceParams {
  network: EBlockchain;
}

export interface IAllowanceParams {
  allowanceValue: BigNumber;
  tokenAddress: Web3Address;
  tokenDecimals: number;
  depositContractAddress: Web3Address;
}

export interface IDepositStablecoinToPAYGParams {
  amount: BigNumber;
  tokenDecimals: number;
  tokenAddress: Web3Address;
  network: EBlockchain;
  depositContractAddress: Web3Address;
}

export interface IGetDepositStablecoinToPAYGFeeParams {
  network: EBlockchain;
  tokenAddress: Web3Address;
  amount: BigNumber;
  depositContractAddress: Web3Address;
  tokenDecimals: number;
}

export interface IGetAllowanceValueParams {
  network: EBlockchain;
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
}

export interface IDepositStablecoinToPAYGForUserParams {
  amount: BigNumber;
  depositContractAddress: Web3Address;
  network: EBlockchain;
  targetAddress: Web3Address;
  tokenAddress: Web3Address;
  tokenDecimals: number;
}

export interface IGetAllowanceFeeParams {
  amount: BigNumber;
  depositContractAddress: Web3Address;
  network: EBlockchain;
  tokenAddress: Web3Address;
  tokenDecimals: number;
}

export interface IGetStablecoinAllowanceParams {
  from: Web3Address;
  network: EBlockchain;
  to: Web3Address;
}

export interface IEstimateStablecoinFeeParams {
  amount: BigNumber;
  from: Web3Address;
  network: EBlockchain;
  to: Web3Address;
  tokenDecimals: number;
}
