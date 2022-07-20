import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { t } from 'modules/i18n/utils/intl';
import { MultiService } from 'modules/api/MultiService';

const ONE_MINUTE_LIFETIME = 60 * 1000;
const ONE_HOUR_LIFETIME = 60 * ONE_MINUTE_LIFETIME;
const ONE_WEEK_HOURS = 7 * 24;
const LIFETIME = ONE_HOUR_LIFETIME * ONE_WEEK_HOURS;

export const authorizeProvider = createSmartAction<
  RequestAction<string, string>
>('infrastructure/authorizeProvider', () => ({
  request: {
    promise: (async () => {
      const service = await MultiService.getInstance();

      const accessToken = await service.authorizeProvider(LIFETIME);

      if (!accessToken) {
        throw new Error(t('error.access-token-error'));
      }

      return accessToken;
    })(),
  },
  meta: {
    getData: data => data,
  },
}));
