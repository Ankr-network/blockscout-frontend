import { t } from 'modules/i18n/utils/intl';

export const getButtonText = (loading: boolean): string => {
  if (loading) {
    return t('top-up-steps.wait');
  }

  return t('top-up-steps.confirm');
};
