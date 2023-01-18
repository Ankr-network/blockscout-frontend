import BigNumber from 'bignumber.js';

import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchChainNodesDetail } from 'domains/chains/actions/fetchChainNodesDetail';

export interface ChainNodesTableProps {
  nodesDetail: ResponseData<typeof fetchChainNodesDetail>;
  className?: string;
}

export interface GroupedNode {
  id: string;
  nodeId: string;
  blockchain: string;
  scheme: string;
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
