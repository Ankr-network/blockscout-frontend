import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { fetchAccountBalance } from 'domains/account/actions/balance/fetchAccountBalance';
import { AmountInputField } from 'domains/account/screens/AccountDetails/components/TopUp/TopUpForm/TopUpFormTypes';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { t } from 'modules/i18n/utils/intl';

const MIN_ANKR_AMOUNT = new BigNumber(0);

export const defaultInitialValues = {
  [AmountInputField.amount]: MIN_ANKR_AMOUNT.toString(10),
};

export const validateAmount = (value: string, allValues: any) => {
  const { balance } = allValues;

  if (!value) {
    return t('validation.required');
  }

  const currentAmount = new BigNumber(value);

  if (currentAmount.isNaN()) {
    return t('validation.number-only');
  }

  if (currentAmount.isLessThan(MIN_ANKR_AMOUNT)) {
    return t('plan.premium-block.min', {
      value: MIN_ANKR_AMOUNT.toFormat(),
    });
  }

  if (balance?.isLessThan(value)) {
    return t('plan.premium-block.balance');
  }

  return undefined;
};

export const useAccountBalance = () => {
  const dispatchRequest = useDispatchRequest();

  const { data, loading: isLoading } = useQuery({
    type: fetchAccountBalance,
  });

  useOnMount(() => {
    dispatchRequest(fetchAccountBalance());
  });

  return {
    balance: data,
    isLoading,
  };
};
