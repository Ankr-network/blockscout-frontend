// in credits
const PRODUCTION_THRESHOLD = 10_000_000;
const STAGING_THRESHOLD = 30_000;

const isProd = () => process.env.REACT_APP_API_ENV === 'prod';

export const getPremiumActivationThreshold = () =>
  isProd() ? PRODUCTION_THRESHOLD : STAGING_THRESHOLD;
