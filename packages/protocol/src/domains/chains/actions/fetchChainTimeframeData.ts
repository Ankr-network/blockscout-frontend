import { RequestAction, RequestsStore } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { IWorkerGlobalStatus, Timeframe } from 'multirpc-sdk';
import { calculateRPCAndLegacyStandaloneStats } from '../utils/calculateRPCAndLegacyStandaloneStats';
import { getLegacyStandaloneUrl } from '../utils/statsUtils';
import { fetchLegacyStandaloneRequests } from './fetchLegacyStandaloneRequests';

type IFetchChainDetailsResponseData = IWorkerGlobalStatus;

interface RequestsCountry {
  country: string;
  bytes?: number;
  requests: number;
}

export type CountryMap = Record<string, RequestsCountry>;

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
  countries: CountryMap;
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
            const rpcStats =
              await MultiService.getPublicInstance().getTimeframeStats(
                chainId,
                timeframe,
              );

            const url = getLegacyStandaloneUrl(chainId);

            if (!url) return rpcStats;

            const { data: legacyStats } = await store.dispatchRequest(
              fetchLegacyStandaloneRequests(url),
            );

            return calculateRPCAndLegacyStandaloneStats(
              timeframe,
              rpcStats,
              legacyStats,
            );
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
