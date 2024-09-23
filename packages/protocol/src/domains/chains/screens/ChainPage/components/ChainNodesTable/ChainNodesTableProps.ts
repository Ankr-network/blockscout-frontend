import BigNumber from 'bignumber.js';
import { INodesDetailEntity } from 'multirpc-sdk';

export interface ChainNodesTableProps {
  loading: boolean;
  nodesDetail: INodesDetailEntity[];
  showNodesWithZeroHeight?: boolean;
}

export interface GroupedNode {
  id: string;
  nodeId: string;
  blockchain: string;
  continent: string;
  country: string;
  organization?: string;
  chainName: string;
  height?: number;
}

export interface ProviderRow extends GroupedNode {
  weight: BigNumber;
  score: number;
}
