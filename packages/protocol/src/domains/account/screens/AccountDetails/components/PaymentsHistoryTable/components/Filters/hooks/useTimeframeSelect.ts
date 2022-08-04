import { useCallback } from 'react';

import { DEFAULT_TIMEFRAME } from '../../../const';
import { ISelectOption } from 'uiKit/Select';
import { PaymentHistoryTableTimeframe } from 'domains/account/types';
import { t } from 'modules/i18n/utils/intl';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';

export type TimeframeSelect = [(event: any) => void, ISelectOption[]];

export const useTimeframeSelect = (
  setTimeframe: (timeframe: PaymentHistoryTableTimeframe) => void,
): TimeframeSelect => {
  const changeTimeframe = useCallback(
    (event: any) => {
      const value = (event?.target?.value ||
        DEFAULT_TIMEFRAME) as PaymentHistoryTableTimeframe;

      setTimeframe(value);
    },
    [setTimeframe],
  );

  const options = useLocaleMemo(
    () => [
      {
        value: PaymentHistoryTableTimeframe.WEEK,
        label: t('account.payment-table.time-type.week'),
      },
      {
        value: PaymentHistoryTableTimeframe.MONTH,
        label: t('account.payment-table.time-type.month'),
      },
      {
        value: PaymentHistoryTableTimeframe.YEAR,
        label: t('account.payment-table.time-type.year'),
      },
    ],
    [],
  );

  return [changeTimeframe, options];
};
