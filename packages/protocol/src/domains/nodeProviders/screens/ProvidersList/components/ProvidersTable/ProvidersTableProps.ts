import { ResponseData } from '../../../../../../modules/api/utils/ResponseData';
import { fetchNodeProviders } from '../../../../actions/fetchNodeProviders';

export interface ProvidersTableProps {
  data: ResponseData<typeof fetchNodeProviders>;
}

export interface ProviderRow {
  id: string;
  blockchain: string;
  scheme: string;
  continent: string;
  country: string;
  city: string;
  totalNodes: number;
  archiveNodes: number;
  icon: string;
  organization?: string;
  chainName: string;
}
