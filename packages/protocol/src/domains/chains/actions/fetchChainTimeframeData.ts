import { RequestAction, RequestsStore } from '@redux-requests/core';
import { IWorkerGlobalStatus, Timeframe } from 'multirpc-sdk';
import { createAction as createSmartAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';

import { MultiService } from 'modules/api/MultiService';
import { fetchTotalRequests } from './fetchTotalRequests';
import {
  calculateOnedayRequests,
  getMultiplier,
  getUrlByChainId,
  mappingTotalRequestsHistory,
  SEVEN_DAYS_IN_WEEK,
} from '../utils/statsUtils';

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

export const fetchChainTimeframeData = createSmartAction<
  RequestAction<IFetchChainDetailsResponseData, IApiChainDetails>
>(
  'chains/fetchChainTimeframeData',
  (chainId: string, timeframe: Timeframe, poll?: number) => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      requestKey: chainId,
      takeLatest: false,
      cache: false,
      poll,
      onRequest: (
        request: any,
        action: RequestAction,
        store: RequestsStore,
      ) => {
        return {
          promise: (async () => {
            const data =
              await MultiService.getPublicInstance().getTimeframeStats(
                chainId,
                timeframe,
              );

            const url = getUrlByChainId(chainId);

            if (url) {
              const { data: result } = await store.dispatchRequest(
                fetchTotalRequests(url),
              );

              const multiplier = getMultiplier(timeframe);
              data.totalRequests = new BigNumber(result?.requests ?? 0)
                .multipliedBy(multiplier)
                .plus(data.totalRequests)
                .toNumber();

              data.totalCached = new BigNumber(result?.cachedRequests ?? 0)
                .multipliedBy(multiplier)
                .plus(data.totalCached)
                .toNumber();

              const totalRequestsHistory = result?.totalRequestsHistory ?? {};
              if (timeframe === '24h') {
                const mappingHistory =
                  mappingTotalRequestsHistory(totalRequestsHistory);
                Object.keys(mappingHistory).forEach((key: string) => {
                  if (key in data.totalRequestsHistory) {
                    data.totalRequestsHistory[key] += mappingHistory[key];
                  }
                });
                Object.keys(data.totalRequestsHistory).forEach(
                  (key: string) => {
                    if (!(key in mappingHistory)) {
                      delete data.totalRequestsHistory[key];
                    }
                  },
                );
              } else if (timeframe === '7d') {
                const amount = Object.keys(data.totalRequestsHistory).length;
                const oneTimestampRequests = new BigNumber(SEVEN_DAYS_IN_WEEK)
                  .multipliedBy(calculateOnedayRequests(totalRequestsHistory))
                  .dividedToIntegerBy(amount)
                  .toNumber();
                Object.keys(data.totalRequestsHistory).forEach(
                  (key: string) => {
                    data.totalRequestsHistory[key] += oneTimestampRequests;
                  },
                );
              } else {
                const onedayRequests =
                  calculateOnedayRequests(totalRequestsHistory);

                Object.keys(data.totalRequestsHistory).forEach(
                  (key: string) => {
                    data.totalRequestsHistory[key] += onedayRequests;
                  },
                );
              }
            }
            return data;
          })(),
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
  }),
);
