const ONE_MINUTE_LIFETIME = 60 * 1000;
const ONE_HOUR_LIFETIME = 60 * ONE_MINUTE_LIFETIME;
const ONE_WEEK_HOURS = 7 * 24;

export const TOKEN_LIFETIME = ONE_HOUR_LIFETIME * ONE_WEEK_HOURS;

export const BACKOFFICE_AUTH_APPLICATION_NAME = 'BackofficeMultiRPC';

export const AUTH_REDIRECT_URL = `${window.origin}/clients`;
