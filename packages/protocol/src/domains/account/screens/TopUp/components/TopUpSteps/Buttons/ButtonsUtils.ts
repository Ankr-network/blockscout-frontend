import { TopUpStep } from 'domains/account/actions/topUp/const';
import { t } from 'modules/i18n/utils/intl';

export const getButtonText = (
  loading: boolean,
  step: TopUpStep,
  hasCredentials: boolean,
  hasError?: boolean,
): string => {
  if (loading) {
    return t(`top-up-steps.button.${step}-loading`);
  }

  if (step === TopUpStep.waitTransactionConfirming && hasError) {
    return t(`top-up-steps.button.${step}-error`);
  }

  if (step === TopUpStep.waitTransactionConfirming && hasCredentials) {
    return t(`top-up-steps.button.${step}-done`);
  }

  return t(`top-up-steps.button.${step}`);
};
