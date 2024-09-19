import { INodesDetailEntity } from 'multirpc-sdk';

export interface ChainNodesLocationsProps {
  loading: boolean;
  shouldShowRealNodesRatio: boolean;
  nodesDetail: INodesDetailEntity[];
}
