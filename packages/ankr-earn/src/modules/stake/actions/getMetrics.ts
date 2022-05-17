import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { ACTION_CACHE_SEC, isMainnet } from 'modules/common/const';

import {
  IMetricsResponse,
  METRICS_MOCK,
  METRICS_URL,
  EMetricsServiceName,
} from '../api/metrics';

export interface IStakeMetrics {
  name: EMetricsServiceName;
  totalStaked: BigNumber;
  totalStakedUsd: BigNumber;
  stakers: BigNumber;
  apy: BigNumber;
}

export const getMetrics = createSmartAction<
  RequestAction<IMetricsResponse, IStakeMetrics[]>
>(
  'stake/getMetrics',
  (): RequestAction => ({
    request: isMainnet
      ? { url: METRICS_URL }
      : {
          promise: Promise.resolve(METRICS_MOCK),
        },
    meta: {
      driver: isMainnet ? 'axios' : undefined,
      showNotificationOnError: false,
      cache: ACTION_CACHE_SEC,
      getData: (data: IMetricsResponse): IStakeMetrics[] =>
        data.services.map(x => ({
          name:
            x.serviceName === 'polygon'
              ? EMetricsServiceName.MATIC
              : (x.serviceName as EMetricsServiceName),
          totalStaked: new BigNumber(x.totalStaked),
          totalStakedUsd: new BigNumber(x.totalStakedUsd),
          stakers: new BigNumber(x.stakers),
          apy: new BigNumber(x.apy),
        })),
    },
  }),
);
