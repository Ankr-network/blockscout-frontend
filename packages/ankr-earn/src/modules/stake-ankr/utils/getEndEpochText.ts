import { t } from '@ankr.com/common';

import { Seconds } from 'modules/common/types';

const textSeparator = ' ';
const EPOCH_END = 0;
const ONE_MINUTE: Seconds = 60;
const ONE_HOUR: Seconds = 60 * ONE_MINUTE;
const ONE_DAY: Seconds = 24 * ONE_HOUR;
const DEFAULT_SECONDS: Seconds = 0;

export const getEndEpochText = (seconds = DEFAULT_SECONDS): string => {
  const epochEndDays = Math.trunc(seconds / ONE_DAY);
  seconds -= epochEndDays * ONE_DAY;
  const epochEndHours = Math.trunc(seconds / ONE_HOUR);
  seconds -= epochEndHours * ONE_HOUR;
  const epochEndMin = Math.trunc(seconds / ONE_MINUTE);

  const result: string[] = [];

  if (epochEndDays > EPOCH_END) {
    const daysText = `${t('stake-ankr.info-header.epoch-ends-day', {
      value: epochEndDays,
    })}`;
    result.push(daysText);
  }

  if (epochEndHours > EPOCH_END) {
    const hoursText = `${t('stake-ankr.info-header.epoch-ends-hour', {
      value: epochEndHours,
    })}`;
    result.push(hoursText);
  }

  if (epochEndMin > EPOCH_END) {
    const minText = `${t('stake-ankr.info-header.epoch-ends-min', {
      value: epochEndMin,
    })}`;
    result.push(minText);
  }

  return result.join(textSeparator);
};
