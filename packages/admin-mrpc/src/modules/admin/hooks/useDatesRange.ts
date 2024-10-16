import { ChangeEvent, useEffect, useState } from 'react';
import { addDays } from 'date-fns';

import { MAX_RANGE_DAYS } from '../const';
import { formatDateToIsoString } from './formatDateToIsoString';
import { formatDateToString } from './formatDateToString';

export const useDatesRange = (withTime = true) => {
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');

  useEffect(() => {
    const dateNow = new Date();
    const dateMonthBefore = addDays(dateNow, -MAX_RANGE_DAYS);
    const dateNowIsoString = withTime
      ? formatDateToIsoString(dateNow)
      : formatDateToString(dateNow);

    const dateMonthBeforeIsoString = withTime
      ? formatDateToIsoString(dateMonthBefore)
      : formatDateToString(dateMonthBefore);

    setDateFrom(dateMonthBeforeIsoString);
    setDateTo(dateNowIsoString);
  }, [withTime]);

  const onChangeFrom = (event: ChangeEvent<HTMLInputElement>) => {
    setDateFrom(event.target.value);
  };

  const onChangeTo = (event: ChangeEvent<HTMLInputElement>) => {
    setDateTo(event.target.value);
  };

  return {
    dateFrom,
    dateTo,
    onChangeFrom,
    onChangeTo,
  };
};
