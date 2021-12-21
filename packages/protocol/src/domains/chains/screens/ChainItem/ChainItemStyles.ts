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
  },
  chainDetailsWrapper: {
    flexGrow: 1,
    maxWidth: '100%',
  },
  chainItemHeader: {},
  chainRequestsOverview: {
    marginTop: theme.spacing(3.25),
  },
  chainItemDetailsInnerSkeleton: {
    [theme.breakpoints.down(BREAKPOINTS.values.WXGAPlus)]: {
      width: '49%',
    },

    '&:not(:last-child)': {
      marginBottom: theme.spacing(2.5),
      [theme.breakpoints.down(BREAKPOINTS.values.WXGAPlus)]: {
        marginBottom: '2%',
      },
    },
  },
  details: {
    display: 'flex',
    width: '100%',
    paddingBottom: 19,
  },
  error: {
    background: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
}));
