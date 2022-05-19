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
  chainDetailsWrapper: {
    flexGrow: 1,
    maxWidth: '100%',
  },
  chainBanner: {
    marginTop: theme.spacing(3.25),
  },
  chainRequestsOverview: {
    marginTop: theme.spacing(3.25),
  },
}));
