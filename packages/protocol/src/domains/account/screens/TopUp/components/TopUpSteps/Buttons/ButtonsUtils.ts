import { t } from '@ankr.com/common';

import { TopUpStep } from 'domains/account/actions/topUp/const';

interface GetButtonTextArguments {
  loading: boolean;
  step: TopUpStep;
  hasPrivateAccess: boolean;
  hasError?: boolean;
}

export const getButtonText = ({
  loading,
  step,
  hasPrivateAccess,
  hasError,
}: GetButtonTextArguments): string => {
  if (loading) {
    return t(`top-up-steps.button.${step}-loading`);
  }

  if (step === TopUpStep.waitTransactionConfirming && hasError) {
    return t(`top-up-steps.button.${step}-error`);
  }

  if (step === TopUpStep.waitTransactionConfirming && hasPrivateAccess) {
    return t(`top-up-steps.button.${step}-done`);
  }

  return t(`top-up-steps.button.${step}`);
};
