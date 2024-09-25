import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

import { IReferralCodeInputProps } from '../ReferralCodeInput';

export interface IUseReferralCodeInputProps {
  appliedReferralCode?: string;
  error?: string;
  setReferralCodeError: (error?: string) => void;
  value?: string;
}

export const useReferralCodeInput = ({
  appliedReferralCode,
  error,
  setReferralCodeError,
  value: initialValue = '',
}: IUseReferralCodeInputProps) => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      setReferralCodeError(undefined);
    },
    [setReferralCodeError],
  );

  const handleReset = useCallback(() => setValue(initialValue), [initialValue]);

  const referralCodeInputProps = useMemo(
    (): IReferralCodeInputProps => ({
      error,
      isReferralCodeApplied:
        Boolean(appliedReferralCode) && appliedReferralCode === value,
      onChange,
      value,
    }),
    [appliedReferralCode, error, onChange, value],
  );

  useEffect(() => setValue(initialValue), [initialValue]);

  return { handleReset, referralCodeInputProps };
};
