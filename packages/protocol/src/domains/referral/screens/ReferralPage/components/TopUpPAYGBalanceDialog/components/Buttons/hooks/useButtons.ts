import { EConvertReferralRewardType } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';

import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { useConvertReferralRewardMutation } from 'modules/referralProgram/actions/convertReferralReward';

export interface IUseButtonsProps {
  amount?: number;
  handleCloseDialog: () => void;
  onError: () => void;
  onSuccess: () => void;
  setInputError: (error: string) => void;
  validateAmount: (amount: string) => string | undefined;
}

export const useButtons = ({
  amount,
  handleCloseDialog,
  onError,
  onSuccess,
  setInputError,
  validateAmount,
}: IUseButtonsProps) => {
  const [handleConvertReward, { isLoading: isConverting }] =
    useConvertReferralRewardMutation();

  const onConfirmButtonClick = useCallback(async () => {
    const amountString = amount?.toString() ?? '';

    const amountError = validateAmount(amountString);

    if (amountError) {
      return setInputError(amountError);
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
    setInputError,
    validateAmount,
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
