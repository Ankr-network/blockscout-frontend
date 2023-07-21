import { t } from '@ankr.com/common';

export const getLabel = (
  hasPremiumLabel: boolean,
  isEnterpriseClient: boolean,
): string => {
  if (hasPremiumLabel) return t('chains.user-premium');
  if (isEnterpriseClient) return t('chains.user-enterprise');

  return t('chains.user-free');
};
