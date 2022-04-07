import { IApiChain, IApiChainURL } from 'domains/chains/api/queryChains';

export interface ChainsListProps {
  data: IApiChain[];
}

export interface Chain {
  id: string;
  icon: string;
  extenders?: IApiChain[];
  extensions?: IApiChain[];
  name: string;
  requests?: number;
  isArchive?: boolean;
  urls: IApiChainURL[];
}
