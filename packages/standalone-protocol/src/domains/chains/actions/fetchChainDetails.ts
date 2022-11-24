import { RequestAction } from '@redux-requests/core';
import { IWorkerGlobalStatus, Timeframe } from 'multirpc-sdk';
import { createAction as createSmartAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';

import { MultiService } from 'modules/api/MultiService';
import { ChainId } from '../api/chain';

type IFetchChainDetailsResponseData = IWorkerGlobalStatus;

interface RequestsCountry {
  country: string;
  bytes: number;
  requests: number;
}

export type Country = Record<string, RequestsCountry>;

export interface IApiChainDetails {
  dataCached: BigNumber;
  totalCached: BigNumber;
  totalServed: BigNumber;
  uniqueVisitors: BigNumber;

  uniqueVisitorsHistory: Record<string, number>;
  totalRequests: BigNumber;
  totalRequestsHistory: Record<string, number>;
  totalCachedHistory: Record<string, number>;
  totalServedHistory: Record<string, number>;
  dataCachedHistory: Record<string, number>;
  countries: Country;
}

export const fetchChainDetails = createSmartAction<
  RequestAction<IFetchChainDetailsResponseData, IApiChainDetails>
>('chains/fetchChainDetails', (chainId: ChainId, timeframe: Timeframe) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    requestKey: chainId,
    poll: 30,
    onRequest: () => {
      return {
        promise: (async () =>
          MultiService.getService()
            .getPublicGateway()
            .getTimeframeStats(chainId, timeframe))(),
      };
    },

    getData: rawData => {
      const data = (() => {
        if ((rawData as any).__content) {
          return JSON.parse((rawData as any).__content);
        }

        return rawData;
      })();

      const {
        dataCached,
        totalCached,
        totalServed,
        uniqueVisitors,
        totalRequests,
        ...other
      } = data;

      return {
        dataCached: new BigNumber(dataCached),
        totalCached: new BigNumber(totalCached),
        totalServed: new BigNumber(totalServed),
        uniqueVisitors: new BigNumber(uniqueVisitors),
        totalRequests: new BigNumber(totalRequests),
        ...other,
      };
    },
  },
}));
