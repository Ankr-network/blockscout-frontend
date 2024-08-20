const ONE_MINUTE_LIFETIME = 60 * 1000;
const ONE_HOUR_LIFETIME = 60 * ONE_MINUTE_LIFETIME;
const ONE_WEEK_HOURS = 7 * 24;

export const TOKEN_LIFETIME = ONE_HOUR_LIFETIME * ONE_WEEK_HOURS;

export const BACKOFFICE_AUTH_APPLICATION_NAME = 'BackofficeMultiRPC';

export const AUTH_REDIRECT_URL = `${window.origin}/clients`;

// use this constant instead of original for local login with google
// because there is a whitelist on backend which does not accept localhost
// then after login with google stage url should be changed to localhost:3000 manually in order to login in local environment
// export const AUTH_REDIRECT_URL = `https://multirpc-backoffice-stage.dccn.ankr.com/clients`;

export const ACTION_TEN_MINUTES_CACHE = 10_000;
