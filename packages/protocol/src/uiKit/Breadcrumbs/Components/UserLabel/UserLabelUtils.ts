import { t } from '@ankr.com/common';

export const getLabel = (hasPremiumLabel: boolean): string => {
  if (hasPremiumLabel) return t('chains.user-premium');

  return t('chains.user-free');
};
