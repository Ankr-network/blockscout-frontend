import { t } from 'common';

export const getNextUnlockTime = (epochEndsSeconds: number): string => {
  let seconds = epochEndsSeconds ?? 0;
  const epochEndDays = Math.trunc((seconds ?? 0) / (60 * 60 * 24));
  seconds -= epochEndDays * 60 * 60 * 24;
  const epochEndHours = Math.trunc((seconds ?? 0) / (60 * 60));
  seconds -= epochEndHours * 60 * 60;
  const epochEndMin = Math.trunc((seconds ?? 0) / 60);

  let daysText;
  if (epochEndDays > 0) {
    daysText = `${t('referrals.stats-table.next-unlock-days', {
      value: epochEndDays,
    })}`;
  }

  let hoursText;
  if (epochEndHours > 0) {
    hoursText = `${t('referrals.stats-table.next-unlock-hours', {
      value: epochEndHours,
    })}`;
  }

  let minText;
  if (epochEndMin > 0) {
    minText = `${t('referrals.stats-table.next-unlock-minutes', {
      value: epochEndMin,
    })}`;
  }

  return `${daysText || ''}${daysText && hoursText ? ' ' : ''}${
    hoursText || ''
  }${minText && (daysText || hoursText) ? ' ' : ''}${minText || ''}`;
};
