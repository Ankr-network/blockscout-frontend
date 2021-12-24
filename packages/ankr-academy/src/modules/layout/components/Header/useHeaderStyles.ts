import { alpha, makeStyles, Theme } from '@material-ui/core';

export const useHeaderStyles = makeStyles<Theme>(theme => ({
  root: {
    backgroundColor: alpha(theme.palette.background.default, 0.8),
    backdropFilter: 'blur(5px)',
  },
  container: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 1fr',
    },
  },
  center: {
    justifyContent: 'center',
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },
  toggle: {
    zIndex: 1301,
    marginRight: theme.spacing(-2.5),
  },
  logo: {},
  rightSide: {
    justifyContent: 'right',
    display: 'flex',
    overflow: 'hidden',

    [theme.breakpoints.up('md')]: {
      overflow: 'visible',
    },
  },
}));
