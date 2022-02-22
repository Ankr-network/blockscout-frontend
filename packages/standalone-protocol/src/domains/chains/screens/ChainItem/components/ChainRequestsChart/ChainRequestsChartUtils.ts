import { Theme } from '@material-ui/core';
import { RequestsLog } from './ChainRequestsChartTypes';

export const getTotalRequestsColor = (chainId: string, theme: Theme) => {
  switch (chainId) {
    case 'near':
      return '#668BF2';

    case 'arbitrum':
      return '#4EA0EA';

    case 'erigonbsc':
      return theme.palette.common.white;

    default:
      return theme.palette.primary.main;
  }
};

export const getCachedRequestsColor = (chainId: string, theme: Theme) => {
  switch (chainId) {
    case 'near':
      return '#9B68AC';

    case 'erigonbsc':
    case 'arbitrum':
      return theme.palette.primary.main;

    case 'iotex':
    case 'nervos':
      return theme.palette.common.white;

    default:
      return theme.palette.primary.dark;
  }
};

export const hasGradient = (chainId: string) => {
  switch (chainId) {
    case 'near':
    case 'iotex':
    case 'avalanche':
    case 'nervos':
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
