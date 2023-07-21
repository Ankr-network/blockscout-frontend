import { useCallback } from 'react';
import { useForm } from 'react-final-form';
import { utils } from 'ethers';

import { WhitelistStepFields } from 'domains/projects/store';

export const useWhitelistInput = () => {
  const { change, getState } = useForm();
  const { values, errors, submitErrors } = getState();
  const key = WhitelistStepFields.contractAddress;

  const normalizeValue = useCallback((value: string) => {
    // removing all spaces from input
    return value.toLowerCase().replace(/\s/g, '');
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = normalizeValue(event.target.value);
      change(key, value);
    },
    [normalizeValue, change, key],
  );

  const hasError = Boolean(
    submitErrors?.contractAddress || errors?.contractAddress,
  );

  const currentValue = values[key];
  const isValid = utils.isAddress(currentValue);

  return {
    onChange: handleChange,
    isErrorHighlighted: hasError && !isValid,
    success: isValid,
    normalizeValue,
    key,
  };
};
