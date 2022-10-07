import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { REFERRALS_ACTIONS_PREFIX } from '../api/const';
import { getCheckIsStakerExistsUrl } from '../api/utils/getCheckIsStakerExistsUrl';

interface IIsStakerExists {
  exists: boolean;
}

export const getIsStakerExists = createSmartAction<
  RequestAction<IIsStakerExists, boolean>,
  [string]
>(`${REFERRALS_ACTIONS_PREFIX}getIsStakerExists`, userAddress => ({
  request: { url: getCheckIsStakerExistsUrl(userAddress) },
  meta: {
    driver: 'axios',
    showNotificationOnError: false,
    getData: data => data.exists,
  },
}));
