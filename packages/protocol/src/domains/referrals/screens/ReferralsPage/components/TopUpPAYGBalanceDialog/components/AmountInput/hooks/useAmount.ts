import { useCallback, useState } from 'react';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { amountInputTranslation } from '../translation';

export interface IUseAmountProps {
  bonuses: number;
}

export interface IValidationOptions {
  validateRequirement?: boolean;
}

export const useAmount = ({ bonuses }: IUseAmountProps) => {
  const [amount, setAmount] = useState<number>();

  const { keys, t } = useTranslation(amountInputTranslation);

  const validateAmount = useCallback(
    (
      amountValue: string,
      { validateRequirement = true }: IValidationOptions = {},
    ) => {
      if (!amountValue) {
        return validateRequirement ? t(keys.amountIsRequiredError) : undefined;
      }

      const amountNumber = Number(amountValue);

      if (Number.isNaN(amountNumber)) {
        return t(keys.amountIsNotANumberError);
      }

      if (amountNumber <= 0) {
        return t(keys.amountTooSmallError);
      }

      if (amountNumber > bonuses) {
        return t(keys.amountTooBigError);
      }

      return undefined;
    },
    [bonuses, keys, t],
  );

  const resetAmount = useCallback(() => setAmount(undefined), []);

  return { amount, resetAmount, setAmount, validateAmount };
};
