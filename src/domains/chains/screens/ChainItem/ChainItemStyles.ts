import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BREAKPOINTS } from '../../../../modules/themes/const';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    [theme.breakpoints.down(BREAKPOINTS.values.WXGAPlus)]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(3.5),
    },
  },
  chainDetailsWrapper: {
    flexGrow: 1,
  },
  chainItemHeader: {},
  chainRequestsOverview: {
    marginTop: theme.spacing(3.25),
  },
  chainItemDetails: {
    width: 350,
    minWidth: 150,
    marginLeft: theme.spacing(3.25),
    [theme.breakpoints.down(BREAKPOINTS.values.WXGAPlus)]: {
      marginLeft: 0,
      marginTop: theme.spacing(3.25),
      width: '100%',
    },
  },
}));
