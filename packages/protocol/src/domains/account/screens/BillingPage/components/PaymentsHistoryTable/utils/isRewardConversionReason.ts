const sign = 'Rewards to credits';

export const isRewardConversionReason = (reason: string) =>
  reason.includes(sign);
