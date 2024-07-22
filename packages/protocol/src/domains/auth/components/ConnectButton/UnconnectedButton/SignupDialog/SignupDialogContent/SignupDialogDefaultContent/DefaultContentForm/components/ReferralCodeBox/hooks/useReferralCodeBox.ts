import { useCallback } from 'react';

import { getReferralCodeFromUrl } from 'modules/referralProgram/utils/getReferralCodeFromUrl';
import { useSavedReferralCode } from 'modules/referralProgram/hooks/useSavedReferralCode';

import { IReferralCodeBoxProps } from '../ReferralCodeBox';
import { useReferralCodeCheckbox } from '../../ReferralCodeCheckbox';
import { useReferralCodeInput } from '../../ReferralCodeInput';

export const useReferralCodeBox = (): IReferralCodeBoxProps => {
  const { referralCode: referralCodeFromUrl } = getReferralCodeFromUrl();

  const hasReferralCodeInUrl = Boolean(referralCodeFromUrl);

  const { handleRemoveSavedReferralCode, handleSaveReferralCode } =
    useSavedReferralCode();

  const { handleReset, referralCodeInputProps: inputProps } =
    useReferralCodeInput({
      isDisabled: hasReferralCodeInUrl,
      onBlur: handleSaveReferralCode,
      value: referralCodeFromUrl,
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
    isChecked: hasReferralCodeInUrl,
    onChange,
  });

  return { checkboxProps, inputProps };
};
