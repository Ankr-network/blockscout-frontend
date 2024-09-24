import { useCallback, useMemo, useState } from 'react';

import { ERewardTxsPeriod } from 'modules/referralProgram/types';

import { ITimePeriodFilterProps } from '../TimePeriodFilter';
import { OnChange } from '../types';

export interface IUseTimePeriodFilter {
  period?: ERewardTxsPeriod;
}

export const useTimePeriodFilter = ({
  period: initialPeriod = ERewardTxsPeriod.AllTime,
}: IUseTimePeriodFilter = {}) => {
  const [period, setPeriod] = useState(initialPeriod);

  const onChange = useCallback<OnChange>(
    event => setPeriod(event.target.value as ERewardTxsPeriod),
    [],
  );

  const timePeriodFilterProps = useMemo(
    (): ITimePeriodFilterProps => ({ onChange, period }),
    [onChange, period],
  );

  return { timePeriod: period, timePeriodFilterProps };
};
