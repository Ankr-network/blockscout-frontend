import { fetchPublicChainsInfo } from 'domains/chains/actions/fetchPublicChainsInfo';
import { ResponseData } from 'modules/api/utils/ResponseData';

export interface ChainsListProps {
  data: ResponseData<typeof fetchPublicChainsInfo>;
  setTotalRequestsData: (totalRequest: string) => void;
}

export interface Chain {
  id: string;
  icon: string;
  rpcLinks: string[];
  name: string;
  requests?: number;
  isArchive?: boolean;
}
