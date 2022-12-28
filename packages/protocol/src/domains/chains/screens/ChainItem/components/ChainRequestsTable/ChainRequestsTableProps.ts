import { INodeEntity } from 'multirpc-sdk';

export interface ChainNodesTableProps {
  data?: INodeEntity[];
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
