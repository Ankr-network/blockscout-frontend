export interface PremiumBalanceThresholds {
  freemiumToPremium: number;
  premiumToFreemium: number;
}

// in credits
const PRODUCTION_THRESHOLDS: PremiumBalanceThresholds = {
  freemiumToPremium: 100_000_000,
  premiumToFreemium: 1,
};

const STAGING_THRESHOLDS: PremiumBalanceThresholds = {
  freemiumToPremium: 300_000,
  premiumToFreemium: 30_000,
};

const isProd = () => process.env.REACT_APP_API_ENV === 'prod';

export const getPremiumBalanceThresholds = () =>
  isProd() ? PRODUCTION_THRESHOLDS : STAGING_THRESHOLDS;
