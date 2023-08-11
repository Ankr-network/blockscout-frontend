import { useMemo } from 'react';

import { DEFAULT_ANKR_VALUE_STRING } from 'domains/account/actions/topUp/const';

import { FormField } from '../constants';
import { FormValues } from '../types';

export interface InitialValuesParams {
  isTopUpProcessing: boolean;
  shouldUseDefaultValue?: boolean;
  transactionAmount?: string;
}

export const useInitialValues = ({
  isTopUpProcessing,
  shouldUseDefaultValue = false,
  transactionAmount = '0',
}: InitialValuesParams) =>
  useMemo((): FormValues => {
    if (isTopUpProcessing) {
      return { [FormField.Amount]: transactionAmount };
    }

    return {
      [FormField.Amount]: shouldUseDefaultValue
        ? DEFAULT_ANKR_VALUE_STRING
        : '',
    };
  }, [isTopUpProcessing, shouldUseDefaultValue, transactionAmount]);
