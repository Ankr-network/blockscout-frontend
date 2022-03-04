import { useState } from 'react';

import { Seconds } from 'modules/common/types';
import {
  getTimeRemaining,
  IGetTimerRemainingData,
} from 'modules/common/utils/getTimeRemaining';
import { useInterval } from 'modules/common/utils/useInterval';
import { t } from 'modules/i18n/utils/intl';

const ONE_SECOND: Seconds = 1000;

interface IUseTimerData {
  timeRemaining: IGetTimerRemainingData;
  isTimeOver: boolean;
  duration: string;
}

export const useTimer = (endDate: Date): IUseTimerData => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(endDate));

  useInterval(() => {
    setTimeRemaining(getTimeRemaining(endDate));
  }, ONE_SECOND);

  const isTimeOver = timeRemaining.total <= 0;

  const duration = t('time.time-left-short', {
    days:
      timeRemaining.days !== 0 &&
      t('time.days-short', {
        days: timeRemaining.days,
      }),
    hours:
      timeRemaining.hours !== 0 &&
      t('time.hours-short', {
        hours: timeRemaining.hours,
      }),
    minutes:
      timeRemaining.minutes !== 0 &&
      t('time.minutes-short', {
        minutes: timeRemaining.minutes,
      }),
    seconds:
      timeRemaining.seconds !== 0 &&
      t('time.seconds-short', {
        seconds: timeRemaining.seconds,
      }),
  });

  return { timeRemaining, duration, isTimeOver };
};
