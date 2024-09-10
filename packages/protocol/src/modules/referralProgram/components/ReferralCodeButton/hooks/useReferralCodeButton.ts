import { useMemo, useState } from 'react';

import { useHasReferralCodeButton } from 'modules/referralProgram/hooks/useHasReferralCodeButton';
import { useReferralProgram } from 'modules/referralProgram/hooks/useReferralProgram';
import { useReferrer } from 'modules/referralProgram/hooks/useReferrer';

import { IReferralCodeButtonProps } from '../ReferralCodeButton';
import { useReferralCodeDialog } from '../../ReferralCodeDialog';
import { useReferralCodeInput } from '../../ReferralCodeInput';
import { useSuccessDialog } from '../../SuccessDialog';

export interface IUseReferralCodeButtonProps {
  onReferralCodeDialogOpen?: () => void;
}

export const useReferralCodeButton = ({
  onReferralCodeDialogOpen,
}: IUseReferralCodeButtonProps = {}) => {
  const { referrer } = useReferrer({ skipFetching: true });
  const [referralCodeError, setReferralCodeError] = useState<string>();

  const appliedReferralCode = referrer?.referral_code;

  const { handleReset, referralCodeInputProps } = useReferralCodeInput({
    appliedReferralCode,
    error: referralCodeError,
    setReferralCodeError,
  });
  const { value: referralCode } = referralCodeInputProps;

  const { banner, blockchainName } = useReferralProgram({ referralCode });

  const { handleSuccessDialogOpen, successDialogProps } = useSuccessDialog({
    banner,
    blockchainName,
  });

  const { handleReferralCodeDialogOpen, referralCodeDialogProps } =
    useReferralCodeDialog({
      appliedReferralCode,
      banner,
      handleReset,
      handleSuccessDialogOpen,
      onOpen: onReferralCodeDialogOpen,
      referralCodeInputProps,
      setReferralCodeError,
    });

  const { hasReferralCodeButton } = useHasReferralCodeButton();

  const referralCodeButtonProps = useMemo(
    (): IReferralCodeButtonProps => ({
      handleReferralCodeDialogOpen,
      isVisible: hasReferralCodeButton,
      referralCodeDialogProps,
      successDialogProps,
    }),
    [
      handleReferralCodeDialogOpen,
      referralCodeDialogProps,
      hasReferralCodeButton,
      successDialogProps,
    ],
  );

  return { hasReferralCodeButton, referralCodeButtonProps };
};
