import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

interface IGetUnstakeFeeResponse {
  unstakeFee: string;
  useBeforeBlock: number;
  signature: string;
}

export const getUnstakeFee = createAction<
  RequestAction<IGetUnstakeFeeResponse, IGetUnstakeFeeResponse>
>('polygon/getUnstakeFee', () => ({
  request: {
    method: 'get',
    url: `//google.com`,
  },
  meta: {
    driver: 'axios',
    asMutation: false,
    getData: data => data,
  },
}));
