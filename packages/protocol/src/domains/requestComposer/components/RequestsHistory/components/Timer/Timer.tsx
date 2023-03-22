import { Clock } from '@ankr.com/ui';

import { padSeconds } from './utils/padSeconds';
import { useTimerStyles } from './TimerStyles';

export interface TimerProps {
  seconds: number;
}

export const Timer = ({ seconds }: TimerProps) => {
  const { classes } = useTimerStyles();

  return (
    <div className={classes.root}>
      <Clock className={classes.icon} color="primary" />
      {padSeconds(seconds)}
    </div>
  );
};
