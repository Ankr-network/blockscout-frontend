import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { getCheckIsStakerExistsUrl } from '../api/utils/getCheckIsStakerExistsUrl';

interface IIsStakerExists {
  exists: boolean;
}

export const fetchIsStakerExists = createSmartAction<
  RequestAction<IIsStakerExists, boolean>,
  [string]
>('referrals/fetchIsStakerExists', userAddress => ({
  request: { url: getCheckIsStakerExistsUrl(userAddress) },
  meta: {
    driver: 'axios',
    showNotificationOnError: false,
    getData: data => data.exists,
  },
}));
