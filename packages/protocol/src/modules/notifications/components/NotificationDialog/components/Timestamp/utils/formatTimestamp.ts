import { format, isToday, isYesterday } from 'date-fns';

export interface IFormatTimestampParams {
  timestamp: number;
  todayPrefix?: string;
  yesterdayPrefix?: string;
}

export const formatTimestamp = ({
  timestamp,
  todayPrefix,
  yesterdayPrefix,
}: IFormatTimestampParams) => {
  if (isToday(timestamp)) {
    return `${todayPrefix} ${format(new Date(timestamp), 'h:mm bb')}`;
  }

  if (isYesterday(timestamp)) {
    return `${yesterdayPrefix} ${format(new Date(timestamp), 'h:mm bb')}`;
  }

  return format(new Date(timestamp), 'MMM d Y HH:mm');
};
