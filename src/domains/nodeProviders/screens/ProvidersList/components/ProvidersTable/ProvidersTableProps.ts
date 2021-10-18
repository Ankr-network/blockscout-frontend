import { INodeEntity } from '@ankr.com/multirpc/dist/types/worker';

export interface ProvidersTableProps {
  data: INodeEntity[];
}

export interface ProviderRow {
  id: string;
  chain: string;
  type: string;
  location: string | null;
  logo?: string;
  organization?: string;
}
