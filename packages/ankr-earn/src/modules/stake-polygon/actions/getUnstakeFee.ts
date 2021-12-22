import { RequestAction } from '@redux-requests/core';
import { Web3Address } from 'modules/common/types';
import { createAction } from 'redux-smart-actions';

interface IGetUnstakeFeeResponse {
  unstakeFee: string;
  useBeforeBlock: number;
  signature: Web3Address;
}

export const getUnstakeFee = createAction<
  RequestAction<IGetUnstakeFeeResponse, string>,
  [string]
>('polygon/getUnstakeFee', address => ({
  request: {
    method: 'get',
    url: `/v1alpha/polygon/unstakeFee`,
    params: {
      address,
    },
  },
  meta: {
    driver: 'axios',
    asMutation: true,
    getData: data => data.unstakeFee,
  },
}));
