import { ResponseData } from '../../../../../../modules/api/utils/ResponseData';
import { fetchNodeProviders } from '../../../../actions/fetchNodeProviders';

export interface ProvidersTableProps {
  data: ResponseData<typeof fetchNodeProviders>;
}

export interface ProviderRow {
  id: string;
  icon: string;
  chain: string;
  type: string;
  location: string | null;
  organization?: string;
}
