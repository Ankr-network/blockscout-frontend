import { useCallback, useState } from 'react';
import { useThrottledCallback } from 'use-debounce';

import { Days } from '../../../../common/types';
import { DEFAULT_YIELD_DAYS_VALUE } from '../../../const';
import { YIELD_DAYS_UPDATE_THROTTLE_SPEED } from '../components/Yield/const';

interface IUseYieldDays {
  yieldDays: Days;
  setYieldDays: (days: Days) => void;
  setDefaultYieldDays: () => void;
}

export const useYieldDays = (): IUseYieldDays => {
  const [yieldDays, setYieldDays] = useState(DEFAULT_YIELD_DAYS_VALUE);
  const onYieldDaysChange = useThrottledCallback(
    setYieldDays,
    YIELD_DAYS_UPDATE_THROTTLE_SPEED,
  );

  const setDefaultYieldDays = useCallback(
    () => setYieldDays(DEFAULT_YIELD_DAYS_VALUE),
    [],
  );

  return {
    yieldDays,
    setYieldDays: onYieldDaysChange,
    setDefaultYieldDays,
  };
};
