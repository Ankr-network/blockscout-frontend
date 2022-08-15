import BigNumber from 'bignumber.js';

import { INodeEntity, IWorkerNodesWeight } from 'multirpc-sdk';

export interface ChainNodesTableProps {
  loading: boolean;
  nodes: INodeEntity[];
  nodesWeight: IWorkerNodesWeight[];
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
