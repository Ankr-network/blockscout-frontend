import { Chain } from '@ankr.com/multirpc/dist/types';
import BigNumber from 'bignumber.js';

import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchChainNodes } from 'domains/chains/actions/fetchChainNodes';
import { fetchNodesWeight } from 'domains/chains/actions/fetchNodesWeight';

export interface ChainNodesTableProps {
  data?: ResponseData<typeof fetchChainNodes>;
  nodesWeight?: ResponseData<typeof fetchNodesWeight>;
}

export interface ProviderRow {
  id: string;
  nodeId: string;
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
  weight?: BigNumber;
  height?: number;
}
