import { ProjectRequestsActivityProps } from '../types';

export type PercentSign = 1 | -1 | 0;

export const getPercent = ({
  todayRequests,
  yesterdayRequests,
}: ProjectRequestsActivityProps) => {
  const difference = todayRequests - yesterdayRequests;
  const absoluteDifference = Math.abs(difference);

  const sign = (difference / (absoluteDifference || 1)) as PercentSign;

  const percent = (absoluteDifference / yesterdayRequests) * 100;

  return { percent, sign };
};
