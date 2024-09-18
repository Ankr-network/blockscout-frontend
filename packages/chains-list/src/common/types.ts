export enum EBlockchainFeature {
  RPC = 'rpc',
  WS = 'ws',
  ComingSoon = 'coming soon',
  REST = 'rest',
  GRPC = 'grpc',
}

export enum EBlockchainType {
  Mainnet = 'mainnet',
  Extension = 'extension',
  Testnet = 'testnet',
  Devnet = 'devnet',
  Customized = 'customized',
  Beacon = 'beacon',
  Opnode = 'opnode',
}

export interface IBlockchainEntity {
  id: string;
  coinName: string;
  name: string;
  premiumOnly?: boolean;
  type: EBlockchainType;

  extends?: string;
  features: EBlockchainFeature[];
  paths?: string[];
}

export interface BlockchainUrls {
  blockchain: IBlockchainEntity;
  rpcURLs: string[];
  wsURLs: string[];
  restURLs: string[];
  enterpriseURLs: string[];
  enterpriseWsURLs: string[];
}

type ChainId = string;

export type ChainsConfig = Record<ChainId, BlockchainUrls>;
