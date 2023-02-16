import { UseFieldConfig } from 'react-final-form';
import { useCallback } from 'react';

import { ANKR_MAX_DECIMALS } from 'domains/account/actions/topUp/const';
import { MAX_USD_DECIMALS } from 'domains/account/actions/usdTopUp/const';
import { normalizeAmount } from 'domains/account/components/TopUp/ANKRTopUpForm/AmountField/AmountFieldUtils';

export type AmountParser = NonNullable<UseFieldConfig<string, string>['parse']>;

export const useAmountParser = (isUSD: boolean): AmountParser => {
  const maxDecimals = isUSD ? MAX_USD_DECIMALS : ANKR_MAX_DECIMALS;

  return useCallback(
    value => normalizeAmount(value, maxDecimals),
    [maxDecimals],
  );
};
