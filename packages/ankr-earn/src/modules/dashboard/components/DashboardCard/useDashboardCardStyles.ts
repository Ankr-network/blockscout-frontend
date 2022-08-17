import { makeStyles } from '@material-ui/core';

export const useDashboardCardStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(0, 2.75),
    height: 110,
    width: '100%',

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2.5),
      height: 260,
    },
  },

  badgeSlot: {
    margin: '0 auto',
    paddingTop: `0 !important`,
  },

  btnSkeleton: {
    borderRadius: 12,
    marginLeft: 'auto',
    marginRight: 0,
    height: 40,
    width: 260,

    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      marginRight: 'auto',
      width: '100%',
    },
  },

  menuSkeleton: {
    borderRadius: 12,
  },

  wrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 0,
  },

  buttons: {
    marginLeft: 'auto',
    marginTop: 0,

    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
    },
  },

  controls: {
    marginRight: theme.spacing(2),

    '& > div': {
      justifyContent: 'flex-end',
    },

    [theme.breakpoints.down('md')]: {
      marginRight: 0,

      '& > div': {
        justifyContent: 'flex-start',
      },
    },
  },
}));
