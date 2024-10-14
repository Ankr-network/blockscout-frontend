import { t } from '@ankr.com/common';

export const QUERY_EMAIL = 'email';

export const SET_UP_2FA_CACHE_KEY = 'init-2fa';

export const getEmailFallback = () =>
  t('user-settings.common.email-value-fallback');
