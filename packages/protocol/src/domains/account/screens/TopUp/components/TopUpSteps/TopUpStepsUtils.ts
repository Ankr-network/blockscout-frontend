import { TopUpStep } from 'domains/account/actions/topUp/const';
import { t } from 'modules/i18n/utils/intl';

export const getButtonText = (loading: boolean, step: TopUpStep): string => {
  if (loading) {
    return t(`top-up-steps.button.${step}-loading`);
  }

  return t(`top-up-steps.button.${step}`);
};
