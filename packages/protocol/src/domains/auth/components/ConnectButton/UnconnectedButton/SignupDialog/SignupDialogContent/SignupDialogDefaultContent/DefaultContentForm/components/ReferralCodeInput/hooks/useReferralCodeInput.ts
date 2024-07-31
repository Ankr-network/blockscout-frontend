import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useValidateReferralCode } from 'modules/referralProgram/hooks/useValidateReferralCode';

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

  const { validateReferralCode } = useValidateReferralCode();

  const [error, setError] = useState<string>();

  const onBlur = useCallback(() => {
    const errorMessage = validateReferralCode(value);

    if (errorMessage) {
      setError(errorMessage);
    }

    onBlurExternal?.(value);
  }, [onBlurExternal, validateReferralCode, value]);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setError(undefined);
  }, []);

  const handleReset = useCallback(() => {
    setValue(initialValue);
    setError(undefined);
  }, [initialValue]);

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }, []);

  const referralCodeInputProps = useMemo(
    (): IReferralCodeInputProps => ({
      error,
      isDisabled,
      onBlur,
      onChange,
      onKeyDown,
      value,
    }),
    [error, isDisabled, onBlur, onChange, onKeyDown, value],
  );

  useEffect(() => setValue(initialValue), [initialValue]);

  return { handleReset, referralCodeInputProps, setError };
};
