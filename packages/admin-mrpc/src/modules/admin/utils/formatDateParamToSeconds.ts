import { millisecondsToSeconds, parseISO } from 'date-fns';

export const formatDateParamToSeconds = (date: string) => {
  return Math.floor(millisecondsToSeconds(parseISO(date).getTime()));
};
