import { t } from '@ankr.com/common';
import { Box, BoxProps } from '@material-ui/core';

import { useTimer } from 'modules/common/hooks/useTimer';

interface ITimerProps extends BoxProps {
  endTime: Date;
}

export const Timer = ({ endTime, ...restProps }: ITimerProps): JSX.Element => {
  const { duration, isTimeOver } = useTimer(endTime);

  return (
    <Box {...restProps}>{isTimeOver ? t('time.time-is-up') : duration}</Box>
  );
};