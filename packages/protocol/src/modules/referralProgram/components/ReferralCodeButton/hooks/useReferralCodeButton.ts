import { useMemo, useState } from 'react';

import { useReferralProgram } from 'modules/referralProgram/hooks/useReferralProgram';
import { useReferrer } from 'modules/referralProgram/hooks/useReferrer';

import { IReferralCodeButtonProps } from '../ReferralCodeButton';
import { useReferralCodeDialog } from '../../ReferralCodeDialog';
import { useReferralCodeInput } from '../../ReferralCodeInput';
import { useSuccessDialog } from '../../SuccessDialog';

export const useReferralCodeButton = () => {
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
      referralCodeInputProps,
      setReferralCodeError,
    });

  const referralCodeButtonProps = useMemo(
    (): IReferralCodeButtonProps => ({
      handleReferralCodeDialogOpen,
      referralCodeDialogProps,
      successDialogProps,
    }),
    [handleReferralCodeDialogOpen, referralCodeDialogProps, successDialogProps],
  );

  return { referralCodeButtonProps };
};
