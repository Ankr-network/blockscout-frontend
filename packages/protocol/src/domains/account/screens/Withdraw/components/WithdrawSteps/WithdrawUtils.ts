import { WithdrawStep } from 'domains/account/actions/withdraw/const';
import { t } from 'modules/i18n/utils/intl';

export const getButtonText = (
  loading: boolean,
  step: WithdrawStep,
  hasError?: boolean,
): string => {
  if (loading) {
    return t(`withdraw-steps.button.${step}-loading`);
  }

  if (hasError && step === WithdrawStep.waitTransactionConfirming) {
    return t(`withdraw-steps.button.${step}-error`);
  }

  return t(`withdraw-steps.button.${step}`);
};
