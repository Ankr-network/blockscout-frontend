import { ChainId } from '../api/chain';

export const isPolygonZkEvm = (chainId: string) => {
  return chainId === ChainId.POLYGON_ZKEVM;
};
