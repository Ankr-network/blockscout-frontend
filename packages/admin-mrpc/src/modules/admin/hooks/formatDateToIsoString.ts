import { format } from 'date-fns';
import { ISO_STRING_FORMAT } from '../const';

export const formatDateToIsoString = (date: Date) => {
  return format(date, ISO_STRING_FORMAT);
};
