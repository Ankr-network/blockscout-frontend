import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { fetchAccountBalance } from 'domains/account/actions/balance/fetchAccountBalance';
import {
  DEFAULT_ANKR_VALUE,
  DEFAULT_ANKR_VALUE_STRING,
} from 'domains/account/actions/topUp/const';
import { AmountInputField } from 'domains/account/screens/AccountDetails/components/TopUp/TopUpForm/TopUpFormTypes';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { t } from 'modules/i18n/utils/intl';

export const defaultInitialValues = {
  [AmountInputField.amount]: DEFAULT_ANKR_VALUE_STRING,
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

  if (currentAmount.isLessThan(DEFAULT_ANKR_VALUE)) {
    return t('plan.premium-block.min', {
      value: DEFAULT_ANKR_VALUE.toFormat(),
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
