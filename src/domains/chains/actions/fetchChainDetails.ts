import { RequestAction } from '@redux-requests/core';
import { IWorkerGlobalStatus } from '@ankr.com/multirpc';
import { createAction as createSmartAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';

import { MultiService } from '../../../modules/api/MultiService';

type IFetchChainDetailsResponseData = IWorkerGlobalStatus;

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
  countries: Record<
    string,
    {
      country: string;
      bytes: number;
      requests: number;
    }
  >;
}

export const fetchChainDetails = createSmartAction<
  RequestAction<IFetchChainDetailsResponseData, IApiChainDetails>
>('chains/fetchChainDetails', (blockchain: string) => ({
  request: {
    promise: (async () => {
      const { service } = MultiService.getInstance();

      return service.getBlockchainStats(blockchain);
    })(),
  },
  meta: {
    asMutation: false,
    getData: data => {
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
