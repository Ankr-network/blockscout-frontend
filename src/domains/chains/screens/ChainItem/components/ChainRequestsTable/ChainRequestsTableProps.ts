import { Chain } from '@ankr.com/multirpc/dist/types';

import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchChainNodes } from 'domains/chains/actions/fetchChainNodes';

export interface ChainNodesTableProps {
  data?: ResponseData<typeof fetchChainNodes>;
}

export interface ProviderRow {
  id: string;
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
}
