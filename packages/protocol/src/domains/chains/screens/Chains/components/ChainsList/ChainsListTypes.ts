import { fetchPublicChains } from 'domains/chains/actions/fetchPublicChains';
import { ResponseData } from 'modules/api/utils/ResponseData';

export interface ChainsListProps {
  data: ResponseData<typeof fetchPublicChains>;
}

export interface Chain {
  id: string;
  icon: string;
  rpcLinks: string[];
  name: string;
  requests?: number;
}
