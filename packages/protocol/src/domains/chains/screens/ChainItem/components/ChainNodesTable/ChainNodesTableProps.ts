import BigNumber from 'bignumber.js';

import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchChainNodes } from 'domains/chains/actions/fetchChainNodes';
import { fetchNodesWeight } from 'domains/chains/actions/fetchNodesWeight';

export interface ChainNodesTableProps {
  data?: ResponseData<typeof fetchChainNodes>;
  nodesWeight?: ResponseData<typeof fetchNodesWeight>;
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
