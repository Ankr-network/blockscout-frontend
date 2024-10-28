import { format } from 'date-fns';

import { DATE_STRING_FORMAT } from '../const';

export const formatDateToString = (date: Date) => {
  return format(date, DATE_STRING_FORMAT);
};
