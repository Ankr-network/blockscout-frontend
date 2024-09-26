import { format } from 'date-fns';

const dateFormat = 'MMM d yyyy, hh:mmaa';

export const formatTimestamp = (timestamp: number) =>
  format(timestamp, dateFormat);
