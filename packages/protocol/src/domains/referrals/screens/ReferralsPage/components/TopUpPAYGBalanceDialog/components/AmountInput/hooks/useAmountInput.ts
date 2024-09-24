import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import { useRewardBalance } from 'modules/referralProgram/hooks/useRewardBalance';

import { IAmountInputProps } from '../AmountInput';
import { useAmount } from './useAmount';

export const useAmountInput = () => {
  const { rewardBalance } = useRewardBalance();

  const bonuses = Number(rewardBalance?.creditBalance ?? 0);

  const [value, setValue] = useState('');
  const [error, setError] = useState<string>();
  const [isFocused, setIsFocused] = useState(true);

  const { amount, resetAmount, setAmount, validateAmount } = useAmount({
    bonuses,
  });

  const onBlur = useCallback(() => setIsFocused(false), []);
  const onFocus = useCallback(() => setIsFocused(true), []);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.target.value;
      const errorMessage = validateAmount(rawValue, {
        validateRequirement: false,
      });

      setError(errorMessage);

      if (!errorMessage) {
        setAmount(Number(rawValue));
      }

      setValue(rawValue);
    },
    [setAmount, validateAmount],
  );

  const onMaxButtonClick = useCallback(() => {
    setValue(bonuses.toString());
    setAmount(bonuses);
  }, [bonuses, setAmount]);

  const reset = useCallback(() => {
    setValue('');
    setError(undefined);
    setIsFocused(true);

    resetAmount();
  }, [resetAmount]);

  const amountInputProps = useMemo(
    (): IAmountInputProps => ({
      amount,
      bonuses,
      error,
      isFocused,
      onBlur,
      onChange,
      onFocus,
      onMaxButtonClick,
      value,
    }),
    [
      amount,
      bonuses,
      error,
      isFocused,
      onBlur,
      onChange,
      onFocus,
      onMaxButtonClick,
      value,
    ],
  );

  return { amount, amountInputProps, error, reset };
};
