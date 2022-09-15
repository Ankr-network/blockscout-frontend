import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { configFromEnv } from 'modules/api/config';
import { Milliseconds } from 'modules/common/types';

import {
  DEFI_MOCK,
  DEFI_URL,
  IDeFiItemResponse,
  TDeFiNetwork,
  TDeFiProtocol,
  TDeFiType,
} from '../api/defi';

const IS_MOCK_USED = false;
export const CACHE_TIME: Milliseconds = 1_000 * 60 * 10;
const baseURL = configFromEnv().gatewayConfig.strapiUrl;

export interface IDeFiItem {
  assets: string;
  network: TDeFiNetwork;
  protocol: TDeFiProtocol;
  type: TDeFiType;
  baseRewards: string;
  protocolLink: string;
  farmingRewards: string;
}

export const getDeFiData = createAction<
  RequestAction<IDeFiItemResponse[], IDeFiItem[]>
>(`defi/getDeFiData`, () => ({
  request: IS_MOCK_USED
    ? { promise: Promise.resolve(DEFI_MOCK) }
    : {
        baseURL,
        url: DEFI_URL,
      },
  meta: {
    driver: IS_MOCK_USED ? '' : 'axios',
    showNotificationOnError: true,
    cache: CACHE_TIME,
    getData: data =>
      data.map(item => ({
        assets: item.assets,
        network: item.network,
        protocol: item.protocol,
        type: item.type,
        baseRewards: item.baseRewards,
        protocolLink: item.protocolLink,
        farmingRewards: item.farmingRewards ?? '',
      })),
  },
}));
