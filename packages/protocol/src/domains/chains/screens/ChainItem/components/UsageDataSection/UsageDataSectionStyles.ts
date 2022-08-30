import { Theme, makeStyles } from '@material-ui/core';

export const useDataUsageSectionStyles = makeStyles<Theme>(theme => ({
  usageDataSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3.75),

    marginTop: theme.spacing(3.75),

    [theme.breakpoints.down('lg')]: {
      gap: theme.spacing(2),

      marginTop: theme.spacing(2),
    },
  },
  timeframe: {
    display: 'none',

    [theme.breakpoints.down('lg')]: {
      display: 'flex',
    },
  },
  error: {
    background: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));
