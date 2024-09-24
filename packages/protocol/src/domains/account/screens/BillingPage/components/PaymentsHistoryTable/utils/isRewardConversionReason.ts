const sign = 'Rewards to credits';

export const isRewardConversionReason = (reason = '') =>
  reason.includes(sign);
