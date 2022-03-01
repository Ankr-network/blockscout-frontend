import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    width: '100%',
  },
  chart: {
    '& .recharts-cartesian-axis-tick-value': {
      fontSize: 12,
      color: theme.palette.text.primary,
    },
  },
}));
