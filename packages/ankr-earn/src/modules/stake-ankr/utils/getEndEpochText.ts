import { t } from 'common';

export const getEndEpochText = (epochEndsSeconds: number): string => {
  let seconds = epochEndsSeconds ?? 0;
  const epochEndDays = Math.trunc((seconds ?? 0) / (60 * 60 * 24));
  seconds -= epochEndDays * 60 * 60 * 24;
  const epochEndHours = Math.trunc((seconds ?? 0) / (60 * 60));
  seconds -= epochEndHours * 60 * 60;
  const epochEndMin = Math.trunc((seconds ?? 0) / 60);

  let daysText;
  if (epochEndDays > 0) {
    daysText =
      epochEndDays === 1
        ? `${t('stake-ankr.info-header.epoch-ends-day', {
            value: epochEndDays,
          })}`
        : `${t('stake-ankr.info-header.epoch-ends-days', {
            value: epochEndDays,
          })}`;
  }

  let hoursText;
  if (epochEndHours > 0) {
    hoursText =
      epochEndHours === 1
        ? `${t('stake-ankr.info-header.epoch-ends-hour', {
            value: epochEndHours,
          })}`
        : `${t('stake-ankr.info-header.epoch-ends-hours', {
            value: epochEndHours,
          })}`;
  }

  const minText = `${t('stake-ankr.info-header.epoch-ends-min', {
    value: epochEndMin,
  })}`;

  return `${daysText || ''}${daysText ? ', ' : ''}${hoursText || ''}${
    hoursText ? ', ' : ''
  }${minText}`;
};
