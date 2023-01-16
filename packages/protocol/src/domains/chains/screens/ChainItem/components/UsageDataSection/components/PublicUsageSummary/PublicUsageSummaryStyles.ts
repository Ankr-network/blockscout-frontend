import { Theme, makeStyles } from '@material-ui/core';

export const useUsageSummaryStyles = makeStyles<Theme>(theme => ({
  usageSummary: {
    display: 'flex',
    gap: theme.spacing(3.75),

    [theme.breakpoints.down('lg')]: {
      gap: theme.spacing(2),
    },

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  stat: {
    flex: 1,
  },
}));
