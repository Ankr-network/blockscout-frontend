import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

import { IReferralCodeInputProps } from '../ReferralCodeInput';

export interface IUseReferralCodeInputProps {
  appliedReferralCode?: string;
  value?: string;
}

export const useReferralCodeInput = ({
  appliedReferralCode,
  value: initialValue = '',
}: IUseReferralCodeInputProps | void = {}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
    [],
  );

  const handleReset = useCallback(() => setValue(initialValue), [initialValue]);

  const referralCodeInputProps = useMemo(
    (): IReferralCodeInputProps => ({
      isReferralCodeApplied:
        Boolean(appliedReferralCode) && appliedReferralCode === value,
      onChange,
      value,
    }),
    [appliedReferralCode, onChange, value],
  );

  useEffect(() => setValue(initialValue), [initialValue]);

  return { handleReset, referralCodeInputProps };
};
