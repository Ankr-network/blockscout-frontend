import { TopUpStep } from 'domains/account/actions/topUp/const';
import { t } from 'modules/i18n/utils/intl';

export const getButtonText = (step: TopUpStep, loading: boolean): string => {
  if (step === TopUpStep.login) {
    return t('top-up-steps.done');
  }

  if (loading) {
    return t('top-up-steps.wait');
  }

  return t('top-up-steps.next');
};
