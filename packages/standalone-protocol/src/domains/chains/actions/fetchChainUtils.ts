import { ChainId } from '../api/chain';

export const isPolygonZkEvm = (chainId: string) => {
  return chainId === ChainId.POLYGON_ZKEVM;
};

export const isTenetEvm = (chainId: string) => {
  return chainId === ChainId.Tenet;
};

export const isHorizenTestnetEvm = (chainId: string) => {
  return chainId === ChainId.HORIZEN_TESTNET_EVM;
};

export const getRPCUrl = (chainId: ChainId) => {
  const location = window?.location.origin;

  if (chainId === ChainId.Nervos) {
    return `${location}/${ChainId.Nervos}`;
  }

  if (chainId === ChainId.POLYGON_ZKEVM) {
    return `${location}/${ChainId.POLYGON_ZKEVM}`;
  }

  return location;
};
