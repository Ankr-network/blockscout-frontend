import { ChainID, Chain, ChainURL } from 'modules/chains/types';

export interface ChainGroup {
  id: ChainGroupID;
  name: string;
  pluralName: string;
  chains: ChainID[];
}

export enum ChainGroupID {
  C_CHAIN = 'c-chain',
  ETH_MAINNET = 'eth-mainnet',
  GOERLI = 'goerli',
  GRPC = 'grpc',
  HORIZEN = 'horizen',
  JSON_RPC = 'json-rpc',
  KOVAN = 'kovan',
  NEAR = 'near',
  NERVOS_CKB = 'nervos-ckb',
  NERVOS_EVM = 'nervos-evm',
  NERVOS_GW = 'nervos-gw',
  P_CHAIN = 'p-chain',
  REST_API = 'rest-api',
  RINKEBY = 'rinkeby',
  ROPSTEN = 'ropsten',
  HOLESKY = 'holesky',
  TENDERMINT_RPC = 'tendermint-rpc',
  TENDERMINT_REST = 'tendermint-rest',
  COSMOS_REST = 'cosmos-rest',
  SEPOLIA = 'sepolia',
  SOLANA = 'solana',
  SOLANA_DEVNET = 'solana_devnet',
  STANDARD_EVM = 'standard-evm',
  X_CHAIN = 'x-chain',
  SUI = 'SUI',
  TENET = 'tenet',
  SCROLL_ALPHA = 'scroll_testnet',
  STELLAR_HORIZON = 'stellar-horizon',
  STELLAR_SOROBAN = 'stellar-soroban',

  FALLBACK = 'FALLBACK',
}

export const nonEvmGroupsList = [
  ChainGroupID.C_CHAIN,
  ChainGroupID.X_CHAIN,
  ChainGroupID.P_CHAIN,
  ChainGroupID.NERVOS_CKB,
  ChainGroupID.NERVOS_GW,
];

export interface EndpointGroup {
  chainName: string;
  id: ChainGroupID;
  name: ChainGroup['name'];
  pluralName: ChainGroup['pluralName'];
  urls: ChainURL[];
  urlsCount: number;
  chains: Chain[];
  beacons?: EndpointGroup[];
  opnodes?: EndpointGroup[];
}

export interface GroupedEndpoints {
  mainnet: EndpointGroup[];
  testnet: EndpointGroup[];
  devnet: EndpointGroup[];
  beaconsMainnet: EndpointGroup[];
  opnodesMainnet: EndpointGroup[];
  beaconsTestnet: EndpointGroup[];
  opnodesTestnet: EndpointGroup[];
}
