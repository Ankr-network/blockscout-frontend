import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

import { IReferralCodeInputProps } from '../ReferralCodeInput';

export interface IUseReferralCodeInputProps {
  isDisabled?: boolean;
  onBlur?: (value: string) => void;
  value?: string;
}

export const useReferralCodeInput = ({
  isDisabled = false,
  onBlur: onBlurExternal,
  value: initialValue = '',
}: IUseReferralCodeInputProps | void = {}) => {
  const [value, setValue] = useState(initialValue);

  const onBlur = useCallback(
    () => onBlurExternal?.(value),
    [onBlurExternal, value],
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
    [],
  );

  const handleReset = useCallback(() => setValue(initialValue), [initialValue]);

  const referralCodeInputProps = useMemo(
    (): IReferralCodeInputProps => ({ isDisabled, onBlur, onChange, value }),
    [isDisabled, onBlur, onChange, value],
  );

  useEffect(() => setValue(initialValue), [initialValue]);

  return { handleReset, referralCodeInputProps };
};
