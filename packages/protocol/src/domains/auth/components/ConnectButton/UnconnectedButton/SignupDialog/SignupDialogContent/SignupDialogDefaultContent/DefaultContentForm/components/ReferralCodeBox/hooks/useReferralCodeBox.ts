import { useCallback } from 'react';

import { useSavedReferralCode } from 'modules/referralProgram/hooks/useSavedReferralCode';
import { useReferralCode } from 'modules/referralProgram/hooks/useReferralCode';

import { IReferralCodeBoxProps } from '../ReferralCodeBox';
import { useReferralCodeCheckbox } from '../../ReferralCodeCheckbox';
import { useReferralCodeInput } from '../../ReferralCodeInput';

export const useReferralCodeBox = (): IReferralCodeBoxProps => {
  const { referralCode } = useReferralCode();

  const hasReferralCode = Boolean(referralCode);

  const { handleRemoveSavedReferralCode, handleSaveReferralCode } =
    useSavedReferralCode();

  const { handleReset, referralCodeInputProps: inputProps } =
    useReferralCodeInput({
      isDisabled: hasReferralCode,
      onBlur: handleSaveReferralCode,
      value: referralCode,
    });

  const onChange = useCallback(
    (isChecked: boolean) => {
      if (!isChecked) {
        handleRemoveSavedReferralCode();

        handleReset();
      }
    },
    [handleRemoveSavedReferralCode, handleReset],
  );

  const checkboxProps = useReferralCodeCheckbox({
    isChecked: hasReferralCode,
    onChange,
  });

  return { checkboxProps, inputProps };
};
