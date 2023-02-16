import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { ACTION_CACHE_SEC, isMainnet } from 'modules/common/const';

import {
  EMetricsServiceName,
  IMetricsResponse,
  METRICS_MOCK,
  METRICS_URL,
} from '../api/metrics';

export interface IStakeMetrics {
  totalStaked: BigNumber;
  totalStakedUsd: BigNumber;
  stakers: string;
  apy: BigNumber;
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

    const totalStaked = new BigNumber(metrics.totalStaked);
    const totalStakedUsd = new BigNumber(metrics.totalStakedUsd);
    const apy = new BigNumber(removeWhiteSpace(metrics.apy) || 0);

    acc[serviceName] = {
      totalStaked,
      totalStakedUsd,
      stakers: metrics.stakers,
      apy,
    };

    return acc;
  }, {} as TMetrics);
}

function removeWhiteSpace(value: string): string {
  return value.replace(/ /g, '');
}
