import { IApiChain } from 'domains/chains/api/queryChains';

export interface ChainsListProps {
  outLoading: boolean;
  data: IApiChain[];
  handleChainInfo: (totalRequest: string, loadingStatus: boolean) => void;
}

export interface Chain {
  id: string;
  icon: string;
  rpcLinks: string[];
  name: string;
  requests?: number;
  isArchive?: boolean;
}
