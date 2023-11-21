import { UserEndpointTokenMode } from 'multirpc-sdk';
import { useCallback } from 'react';

import { useValueExistValidator } from './useValueExistValidator';

export interface UseValidatorParams {
  currentValue?: string;
  type: UserEndpointTokenMode;
  validate: (value?: string) => string | undefined;
}

export const useValidator = ({
  currentValue,
  type,
  validate,
}: UseValidatorParams) => {
  const validateIfValueExist = useValueExistValidator(type);

  return useCallback(
    (value?: string) => {
      if (currentValue && currentValue === value) {
        return validate(value);
      }

      return validate(value) || validateIfValueExist(value);
    },
    [currentValue, validate, validateIfValueExist],
  );
};
