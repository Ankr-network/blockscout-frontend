import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { Validate } from '../types';

export interface UseWhitelistItemInputParams {
  validate?: Validate;
  value?: string;
}

export const useWhitelistItemInput = ({
  validate,
  value: initialValue = '',
}: UseWhitelistItemInputParams) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value: newValue } = event.target;

      const errorMessage = validate?.(newValue || undefined);

      setValue(newValue);
      setIsValid(!errorMessage);
      setError(errorMessage);
    },
    [validate],
  );

  const reset = useCallback(() => {
    setValue(initialValue);
    setIsValid(true);
    setError(undefined);
  }, [initialValue]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return { error, isValid, onChange, reset, value };
};
