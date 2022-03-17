import { useTimer } from 'modules/common/hooks/useTimer';

import { useFetchUnstakeEndDate } from '../../../hooks/useFetchUnstakeEndDate';

interface IUseUnstakeTimerData {
  duration: string;
  isTimeOver: boolean;
}

export const useUnstakeTimer = (): IUseUnstakeTimerData => {
  const endDate = useFetchUnstakeEndDate();

  const { duration, isTimeOver } = useTimer(endDate);

  return {
    duration,
    isTimeOver,
  };
};
