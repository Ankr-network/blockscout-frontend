import { INodesDetailEntity } from 'multirpc-sdk';

export interface LocationsTableProps {
  loading: boolean;
  nodesDetail: INodesDetailEntity[];
}

export interface ProviderRow {
  continent: string;
  isFree?: boolean;
  isPremium?: boolean;
}
