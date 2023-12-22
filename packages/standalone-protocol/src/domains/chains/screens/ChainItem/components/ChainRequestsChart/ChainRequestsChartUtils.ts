import { Theme } from '@material-ui/core';

import { ChainId } from 'domains/chains/api/chain';
import { Themes } from 'modules/themes/types';

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
    case ChainId.Fantom:
      return '#0890FF';

    case ChainId.BSC:
      return theme.palette.common.white;

    case ChainId.POLYGON_ZKEVM:
      return theme.palette.common.black;

    case ChainId.ZksyncEra:
      return theme.palette.type === Themes.light
        ? theme.palette.primary.main
        : theme.palette.common.white;

    case ChainId.Scroll:
      return '#62E2D1';

    case ChainId.Stellar:
      return '#B4A9E1';

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
    case ChainId.Mantle:
      return theme.palette.common.white;

    case ChainId.Gnosis:
      return theme.palette.error.main;

    case ChainId.Klaytn:
      return '#F99A00';

    case ChainId.Filecoin:
      return '#3AC0CD';

    case ChainId.POLYGON_ZKEVM:
      return theme.palette.primary.main;

    case ChainId.Rollux:
      return '#EACF5E';

    case ChainId.Flare:
      return '#C2BDE6';

    case ChainId.XDC:
      return '#9F99D1';

    case ChainId.Stellar:
      return '#47A0AD';

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
    case ChainId.Mantle:
    case ChainId.XDC:
    case ChainId.Scroll:
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
    case ChainId.Sei:
      return theme.palette.grey['500'];

    case ChainId.Scroll:
      return theme.palette.grey['800'];

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
