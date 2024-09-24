import { EConvertReferralRewardType } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';

import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { useConvertReferralRewardMutation } from 'modules/referralProgram/actions/convertReferralReward';

export interface IUseButtonsProps {
  amount?: number;
  error?: string;
  handleCloseDialog: () => void;
  onError: () => void;
  onSuccess: () => void;
}

export const useButtons = ({
  amount,
  error,
  handleCloseDialog,
  onError,
  onSuccess,
}: IUseButtonsProps) => {
  const [handleConvertReward, { isLoading: isConverting }] =
    useConvertReferralRewardMutation();

  const onConfirmButtonClick = useCallback(async () => {
    const amountString = amount?.toString() ?? '';

    if (!error) {
      const response = await handleConvertReward({
        amount: amountString,
        type: EConvertReferralRewardType.BalanceTopUp,
      });

      if (isMutationSuccessful(response)) {
        onSuccess();
      } else {
        onError();
      }

      handleCloseDialog();
    }
  }, [
    amount,
    error,
    handleCloseDialog,
    handleConvertReward,
    onError,
    onSuccess,
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
