import { Theme } from '@material-ui/core';
import { ChainId } from 'domains/chains/api/chain';
import { RequestsLog } from './ChainRequestsChartTypes';

export const getTotalRequestsColor = (chainId: ChainId, theme: Theme) => {
  switch (chainId) {
    case ChainId.Near:
      return '#668BF2';

    case ChainId.Arbitrum:
      return '#4EA0EA';

    case ChainId.Erigonbsc:
      return theme.palette.common.white;

    default:
      return theme.palette.primary.main;
  }
};

export const getCachedRequestsColor = (chainId: ChainId, theme: Theme) => {
  switch (chainId) {
    case ChainId.Near:
      return '#9B68AC';

    case ChainId.Erigonbsc:
    case ChainId.Arbitrum:
      return theme.palette.primary.main;

    case ChainId.IoTeX:
    case ChainId.Nervos:
      return theme.palette.common.white;

    default:
      return theme.palette.primary.dark;
  }
};

export const hasGradient = (chainId: ChainId) => {
  switch (chainId) {
    case ChainId.Near:
    case ChainId.IoTeX:
    case ChainId.Avalanche:
    case ChainId.Nervos:
      return false;

    default:
      return true;
  }
};

export const processData = (requestsLog: RequestsLog) => {
  if (!requestsLog) return [];

  const rows = Object.entries(requestsLog);

  return rows
    .map(row => {
      const [rowTime, callsCount] = row;

      return {
        rowTime,
        time: new Date(Number(rowTime)),
        callsCount,
      };
    })
    .sort((a, b) => a.time.getTime() - b.time.getTime());
};
