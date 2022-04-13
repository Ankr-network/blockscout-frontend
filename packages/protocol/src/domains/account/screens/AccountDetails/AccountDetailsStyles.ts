import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BREAKPOINTS } from 'ui';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    [theme.breakpoints.down(BREAKPOINTS.values.WXGAPlus)]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(3.5),
    },
    maxWidth: 940,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(1.5, 3),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  topUp: {
    minWidth: 300,

    [theme.breakpoints.down('md')]: {
      minWidth: 'auto',
    },
  },
}));
