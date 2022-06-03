import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '3px 9px',
  },
  marker: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),

    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(1.25),
      height: theme.spacing(1.25),
    },
  },
  usdBalance: {
    width: theme.spacing(9),
    height: theme.spacing(2.5),

    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(7.5),
      height: theme.spacing(2),
    },
  },
  description: {
    width: theme.spacing(43),
    height: theme.spacing(2.5),

    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(35),
      height: theme.spacing(2),
    },
  },
}));
