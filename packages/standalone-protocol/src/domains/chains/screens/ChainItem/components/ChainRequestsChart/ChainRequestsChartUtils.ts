import { Theme } from '@material-ui/core';
import { ChainId } from 'domains/chains/api/chain';
import { RequestsLog } from './ChainRequestsChartTypes';

export const getTotalRequestsColor = (chainId: ChainId, theme: Theme) => {
  switch (chainId) {
    case ChainId.Moonbeam:
      return '#74C8C7';

    case ChainId.Near:
      return '#668BF2';

    case ChainId.Arbitrum:
      return '#4EA0EA';

    case ChainId.Ethereum:
      return theme.palette.primary.light;

    case ChainId.Gnosis:
      return '#439AB1';

    case ChainId.Klaytn:
      return theme.palette.primary.main;

    case ChainId.Filecoin:
      return '#0890FF';

    default:
      return theme.palette.primary.main;
  }
};

export const getCachedRequestsColor = (chainId: ChainId, theme: Theme) => {
  switch (chainId) {
    case ChainId.Near:
      return '#9B68AC';

    case ChainId.Arbitrum:
      return theme.palette.primary.main;

    case ChainId.IoTeX:
    case ChainId.Nervos:
    case ChainId.Moonbeam:
      return theme.palette.common.white;

    case ChainId.Gnosis:
      return theme.palette.error.main;

    case ChainId.Klaytn:
      return '#F99A00';

    case ChainId.Filecoin:
      return '#3AC0CD';

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
    case ChainId.Gnosis:
    case ChainId.Secret:
      return false;

    default:
      return true;
  }
};

export const getGridBorderColor = (chainId: ChainId, theme: Theme) => {
  switch (chainId) {
    case ChainId.Secret:
      return '#413F49';
    default:
      return theme?.palette?.grey['300'];
  }
};

export const getForeColor = (chainId: ChainId, theme: Theme) => {
  switch (chainId) {
    case ChainId.Gnosis:
      return theme.palette.grey['500'];

    default:
      return theme.palette.text.primary;
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
