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
  totalStaked: BigNumber;
  totalStakedUsd: BigNumber;
  stakers: string;
  apy: string;
}

export type TMetrics = Record<EMetricsServiceName, IStakeMetrics>;

export const getMetrics = createSmartAction<
  RequestAction<IMetricsResponse, TMetrics>
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
      getData: mapMetrics,
    },
  }),
);

function mapMetrics(data: IMetricsResponse) {
  return data.services.reduce((acc, metrics) => {
    const serviceName =
      metrics.serviceName === 'polygon'
        ? EMetricsServiceName.MATIC
        : (metrics.serviceName as EMetricsServiceName);

    acc[serviceName] = {
      totalStaked: new BigNumber(metrics.totalStaked),
      totalStakedUsd: new BigNumber(metrics.totalStakedUsd),
      stakers: metrics.stakers,
      apy: metrics.apy,
    };

    return acc;
  }, {} as TMetrics);
}
