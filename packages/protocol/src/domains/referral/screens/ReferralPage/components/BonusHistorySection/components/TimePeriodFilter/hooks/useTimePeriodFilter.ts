import { useCallback, useMemo, useState } from 'react';

import { ETimePeriod } from 'domains/referral/screens/ReferralPage/types';

import { ITimePeriodFilterProps } from '../TimePeriodFilter';
import { OnChange } from '../types';

export interface IUseTimePeriodFilter {
  period?: ETimePeriod;
}

export const useTimePeriodFilter = ({
  period: initialPeriod = ETimePeriod.AllTime,
}: IUseTimePeriodFilter = {}) => {
  const [period, setPeriod] = useState(initialPeriod);

  const onChange = useCallback<OnChange>(
    event => setPeriod(event.target.value as ETimePeriod),
    [],
  );

  const timePeriodFilterProps = useMemo(
    (): ITimePeriodFilterProps => ({ onChange, period }),
    [onChange, period],
  );

  return { timePeriod: period, timePeriodFilterProps };
};
