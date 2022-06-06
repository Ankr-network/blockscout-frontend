import { useCallback, useState } from 'react';

import { Period } from 'domains/chains/types';

const { Day, Week, Month } = Period;

const periods: Period[] = [Day, Week, Month];

export const usePeriod = (): [Period, () => void] => {
  const [currentPeriod, setCurrentPeriod] = useState(Month);

  const toggle = useCallback(() => {
    const currentIndex = periods.findIndex(period => period === currentPeriod);

    setCurrentPeriod(periods[currentIndex + 1] || periods[0]);
  }, [currentPeriod]);

  return [currentPeriod, toggle];
};
