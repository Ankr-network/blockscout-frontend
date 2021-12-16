import { Box, BoxProps } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { useTimer } from 'modules/common/hooks/useTimer';

interface ITimerProps extends BoxProps {
  endTime: Date;
}

export const Timer = ({ endTime, ...restProps }: ITimerProps) => {
  const { duration, isTimeOver } = useTimer(endTime);

  return (
    <Box {...restProps}>{isTimeOver ? t('time.time-is-up') : duration}</Box>
  );
};
