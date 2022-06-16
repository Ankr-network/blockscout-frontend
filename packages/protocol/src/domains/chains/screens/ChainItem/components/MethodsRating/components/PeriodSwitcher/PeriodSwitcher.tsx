import { Button } from '@material-ui/core';

import { Period } from 'domains/chains/types';
import { labelsMap } from './const';

import { useStyles } from './PeriodSwitcherStyles';

export interface PeriodSwitcherProps {
  onSwitch: () => void;
  period: Period;
}

export const PeriodSwitcher = ({ onSwitch, period }: PeriodSwitcherProps) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.periodSwitcherRoot}
      onClick={onSwitch}
      variant="outlined"
    >
      {labelsMap[period]}
    </Button>
  );
};
