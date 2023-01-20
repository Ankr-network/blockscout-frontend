import BigNumber from 'bignumber.js';
import { INodeEntity, IWorkerNodesWeight } from 'multirpc-sdk';

export interface ChainNodesTableProps {
  data?: INodeEntity[];
  nodesWeight?: IWorkerNodesWeight[];
  className?: string;
}

export interface GroupedNode {
  id: string;
  nodeId: string;
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
  height?: number;
}

export interface ProviderRow extends GroupedNode {
  weight: BigNumber;
  score: number;
}
