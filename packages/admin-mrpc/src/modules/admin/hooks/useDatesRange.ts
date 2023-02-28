import { ChangeEvent, useEffect, useState } from 'react';
import { addDays } from 'date-fns';
import { MAX_RANGE_DAYS } from '../const';
import { formatDateToIsoString } from './formatDateToIsoString';

export const useDatesRange = () => {
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');

  useEffect(() => {
    const dateNow = new Date();
    const dateYesterday = addDays(dateNow, -MAX_RANGE_DAYS);
    const dateNowIsoString = formatDateToIsoString(dateNow);
    const dateYesterdayIsoString = formatDateToIsoString(dateYesterday);

    setDateFrom(dateYesterdayIsoString);
    setDateTo(dateNowIsoString);
  }, []);

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
