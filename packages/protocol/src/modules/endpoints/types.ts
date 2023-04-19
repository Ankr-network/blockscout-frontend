import { IApiChain, IApiChainURL } from 'domains/chains/api/queryChains';
import { ChainID } from 'modules/chains/types';

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
  SECRET_RPC = 'scrt-rpc',
  SECRET_REST = 'scrt-rest',
  SECRET_COSMOS_REST = 'scrt-cosmos-rest',
  SEPOLIA = 'eth_sepolia',
  SOLANA = 'solana',
  SOLANA_DEVNET = 'solana_devnet',
  STANDARD_EVM = 'standard-evm',
  X_CHAIN = 'x-chain',

  FALLBACK = 'FALLBACK',
}

export interface EndpointGroup {
  chainName: string;
  id: ChainGroupID;
  name: ChainGroup['name'];
  pluralName: ChainGroup['pluralName'];
  urls: IApiChainURL[];
  urlsCount: number;
  chains: IApiChain[];
  beacons?: EndpointGroup[];
  opnodes?: EndpointGroup[];
}

export interface GroupedEndpoints {
  mainnet: EndpointGroup[];
  testnet: EndpointGroup[];
  devnet: EndpointGroup[];
}
