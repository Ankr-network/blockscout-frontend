import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { configFromEnv } from 'modules/api/config';
import { ACTION_CACHE_SEC } from 'modules/common/const';

interface IItemData {
  serviceName: string;
  totalStaked: string;
  stakers: string;
  apy: string;
}

interface IValidatorsData {
  services: IItemData[];
}

export interface IValidatorDetails {
  name: string;
  totalStaked: BigNumber;
  stakers: BigNumber;
  apy: BigNumber;
}

export const fetchValidatorsDetails = createSmartAction<
  RequestAction<IValidatorDetails[], IValidatorDetails[]>
>(
  'metrics/fetchValidatorsDetails',
  (): RequestAction => ({
    request: {
      method: 'get',
      url: `${configFromEnv().gatewayConfig.baseUrl}v1alpha/metrics`,
    },
    meta: {
      showNotificationOnError: false,
      cache: ACTION_CACHE_SEC,
      driver: 'axios',
      getData: (data: IValidatorsData): IValidatorDetails[] =>
        data.services.map(x => ({
          name: x.serviceName,
          totalStaked: new BigNumber(x.totalStaked),
          stakers: new BigNumber(x.stakers),
          apy: new BigNumber(x.apy),
        })),
    },
  }),
);
