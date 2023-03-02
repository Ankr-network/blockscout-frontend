import { format } from 'date-fns';

export const formatTimestamp = (timestamp: number) =>
  format(new Date(Number(timestamp)), 'HH:mm:ss, MMM d');
