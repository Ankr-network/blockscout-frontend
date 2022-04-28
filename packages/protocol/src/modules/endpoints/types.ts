import { IApiChain, IApiChainURL } from 'domains/chains/api/queryChains';

export interface ChainGroup {
  id: string;
  name: string;
  pluralName: string;
  chains: IApiChain['id'][];
}

export interface EndpointGroup {
  name: ChainGroup['name'];
  pluralName: ChainGroup['pluralName'];
  urls: IApiChainURL[];
  urlsCount: number;
}

export interface GroupedEndpoints {
  mainnet: EndpointGroup[];
  testnet: EndpointGroup[];
}
