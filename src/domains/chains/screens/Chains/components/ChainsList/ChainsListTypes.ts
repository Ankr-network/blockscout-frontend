import { fetchChains } from 'domains/chains/actions/fetchChains';
import { ResponseData } from 'modules/api/utils/ResponseData';

export interface ChainsListProps {
  data: ResponseData<typeof fetchChains>;
}

export interface Chain {
  id: string;
  rpcLinks: string[];
  name: string;
  requests?: number;
}
