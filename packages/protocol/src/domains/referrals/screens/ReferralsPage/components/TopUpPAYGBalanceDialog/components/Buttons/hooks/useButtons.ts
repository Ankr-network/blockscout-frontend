import { EConvertReferralRewardType } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';

import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { useConvertReferralRewardMutation } from 'modules/referralProgram/actions/convertReferralReward';

import { ValidateAmount } from '../../AmountInput/types';

export interface IUseButtonsProps {
  amount?: number;
  handleCloseDialog: () => void;
  onError: () => void;
  onSuccess: () => void;
  setError: (error: string) => void;
  validateAmount: ValidateAmount;
}

export const useButtons = ({
  amount,
  handleCloseDialog,
  onError,
  onSuccess,
  setError,
  validateAmount,
}: IUseButtonsProps) => {
  const [handleConvertReward, { isLoading: isConverting }] =
    useConvertReferralRewardMutation();

  const onConfirmButtonClick = useCallback(async () => {
    const amountString = amount?.toString() ?? '';

    const error = validateAmount(amountString, { validateRequirement: true });

    if (error) {
      return setError(error);
    }

    const response = await handleConvertReward({
      amount: amountString,
      type: EConvertReferralRewardType.BalanceTopUp,
    });

    if (isMutationSuccessful(response)) {
      onSuccess();
    } else {
      onError();
    }

    return handleCloseDialog();
  }, [
    amount,
    handleCloseDialog,
    handleConvertReward,
    onError,
    onSuccess,
    validateAmount,
    setError,
  ]);

  const onCancelButtonClick = handleCloseDialog;

  const buttonsProps = useMemo(
    () => ({
      isConverting,
      onCancelButtonClick,
      onConfirmButtonClick,
    }),
    [isConverting, onCancelButtonClick, onConfirmButtonClick],
  );

  return { buttonsProps };
};
