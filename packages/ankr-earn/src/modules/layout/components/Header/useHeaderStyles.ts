import { makeStyles, Theme } from '@material-ui/core';

export const useHeaderStyles = makeStyles<Theme>(theme => ({
  container: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),

    [theme.breakpoints.up('xl')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 2.9fr 1fr',
    },
  },

  center: {
    justifyContent: 'center',
    display: 'none',

    [theme.breakpoints.up('xl')]: {
      display: 'flex',
    },
  },

  toggle: {
    zIndex: theme.zIndex.drawer + 1,
    marginRight: theme.spacing(-2.5),
  },

  logo: {
    marginLeft: theme.spacing(-2),
  },

  leftSide: {
    display: 'flex',
    alignItems: 'center',
  },

  rightSide: {
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'center',
    overflow: 'hidden',

    [theme.breakpoints.up('md')]: {
      overflow: 'visible',
    },
  },

  rightComponentSlot: {
    marginLeft: theme.spacing(2),
  },

  banners: {
    display: 'grid',
    paddingTop: theme.spacing(2),
    gap: theme.spacing(2, 0),
  },
}));
