import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BREAKPOINTS } from 'modules/themes/const';

const CHAIN_DETAILS_WIDTH = 350;

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
    maxWidth: `calc(100% - ${CHAIN_DETAILS_WIDTH}px)`,
    [theme.breakpoints.down(BREAKPOINTS.values.WXGAPlus)]: {
      maxWidth: '100%',
    },
  },
  chainItemHeader: {},
  chainRequestsOverview: {
    marginTop: theme.spacing(3.25),
  },
  chainItemDetails: {
    width: CHAIN_DETAILS_WIDTH,
    minWidth: 150,
    marginLeft: theme.spacing(3.25),
    [theme.breakpoints.down(BREAKPOINTS.values.WXGAPlus)]: {
      marginLeft: 0,
      marginTop: theme.spacing(3.25),
      width: '100%',
    },
  },
  chainItemDetailsSkeleton: {
    [theme.breakpoints.down(BREAKPOINTS.values.WXGAPlus)]: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
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
}));
