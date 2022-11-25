import { IWorkerPublicStats, Timeframe } from 'multirpc-sdk';
import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import {
  getLegacyStandaloneUrl,
  getMultiplier,
  LEGACY_CHAINS,
} from '../utils/statsUtils';
import { fetchLegacyStandaloneRequests } from './fetchLegacyStandaloneRequests';
import { calculateTotalRequests } from '../utils/calculateRPCAndLegacyStandaloneStats';
import { ChainID } from 'modules/chains/types';

export const fetchPublicRequestsCountStats = createAction<
  RequestAction<IWorkerPublicStats, Record<ChainID, string>>
>('chains/fetchPublicRequestsCountStats', (timeframe: Timeframe) => ({
  request: {
    promise: (async () => {})(),
  },
  meta: {
    asMutation: false,
    onRequest: (request: any, action: RequestAction, store: RequestsStore) => {
      return {
        promise: (async () => {
          const totalRequestsData = (
            await MultiService.getService()
              .getPublicGateway()
              .getPublicTimeframesStats(timeframe)
          ).totalRequests;

          const legacyChainUrl: Record<string, string>[] = Object.keys(
            LEGACY_CHAINS,
          ).map(chainId => ({
            chainId,
            url: getLegacyStandaloneUrl(chainId),
          }));

          const results = await Promise.all(
            legacyChainUrl.map(item =>
              store.dispatchRequest(
                fetchLegacyStandaloneRequests(item.url, item.chainId),
              ),
            ),
          );

          const legacyStats = results.map(item => {
            return {
              chainId: item.data?.chainId,
              requests: item.data?.requests ?? 0,
            };
          });

          Object.keys(totalRequestsData).forEach(key => {
            if (key in LEGACY_CHAINS) {
              const legacyData = legacyStats.find(item => item.chainId === key);

              const totalRequests = calculateTotalRequests(
                getMultiplier(timeframe),
                Number(totalRequestsData[key]),
                Number(legacyData?.requests ?? 0),
              );

              totalRequestsData[key] = totalRequests.toString();
            }
          });

          return totalRequestsData;
        })(),
      };
    },
    takeLatest: true,
  },
}));
