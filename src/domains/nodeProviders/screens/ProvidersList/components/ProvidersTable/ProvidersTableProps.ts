import { ResponseData } from '../../../../../../modules/api/utils/ResponseData';
import { fetchNodeProviders } from '../../../../actions/fetchNodeProviders';
import { Chain } from '@ankr.com/multirpc/dist/types';

export interface ProvidersTableProps {
  data: ResponseData<typeof fetchNodeProviders>;
}

export interface ProviderRow {
  id: string;
  blockchain: Chain;
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
