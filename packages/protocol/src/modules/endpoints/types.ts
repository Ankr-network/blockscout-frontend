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
  P_CHAIN = 'p-chain',
  RINKEBY = 'rinkeby',
  ROPSTEN = 'ropsten',
  SOLANA = 'solana',
  STANDARD_EVM = 'standard-evm',
  X_CHAIN = 'x-chain',
}

export interface EndpointGroup {
  id: ChainGroupID;
  name: ChainGroup['name'];
  pluralName: ChainGroup['pluralName'];
  urls: IApiChainURL[];
  urlsCount: number;
}

export interface GroupedEndpoints {
  mainnet: EndpointGroup[];
  testnet: EndpointGroup[];
}
