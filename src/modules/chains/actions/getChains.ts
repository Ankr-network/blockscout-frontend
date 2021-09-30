import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

const CHAINS_URL = '/';

interface IApiChains {}

export interface IGetChainsParams {}

export interface IGetChains {}

export const getChains = createSmartAction<
  RequestAction<IApiChains, IGetChains | null>,
  [IGetChainsParams?, RequestActionMeta<IApiChains, IGetChains>?]
>('getChains', (params, meta) => ({
  request: {
    url: CHAINS_URL,
    method: 'post',
    data: {},
  },
  meta: {
    asMutation: false,
    ...meta,
    auth: false,
    driver: 'axios',
    getData: data => data,
  },
}));
