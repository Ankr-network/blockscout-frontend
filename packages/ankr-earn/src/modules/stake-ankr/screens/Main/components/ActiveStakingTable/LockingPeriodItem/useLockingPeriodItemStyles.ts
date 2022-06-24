import { makeStyles } from '@material-ui/core';

export const useLockingPeriodItemStyles = makeStyles(theme => ({
  lockPeriodDescription: {
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: 14,
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
  },

  unlockedText: {
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: 14,
    color: theme.palette.primary.main,
  },
}));
