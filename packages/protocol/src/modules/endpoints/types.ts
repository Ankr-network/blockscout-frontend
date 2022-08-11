import { IApiChain, IApiChainURL } from 'domains/chains/api/queryChains';

export interface ChainGroup {
  id: ChainGroupID;
  name: string;
  pluralName: string;
  chains: IApiChain['id'][];
}

export enum ChainGroupID {
  C_CHAIN = 'c-chain',
  ETH_MAINNET = 'eth-mainnet',
  GOERLI = 'goerli',
  KOVAN = 'kovan',
  NERVOS_EVM = 'nervos-evm',
  NERVOS_GW = 'nervos-gw',
  NERVOS_CKB = 'nervos-ckb',
  P_CHAIN = 'p-chain',
  RINKEBY = 'rinkeby',
  ROPSTEN = 'ropsten',
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
}

export interface GroupedEndpoints {
  mainnet: EndpointGroup[];
  testnet: EndpointGroup[];
  devnet: EndpointGroup[];
}
