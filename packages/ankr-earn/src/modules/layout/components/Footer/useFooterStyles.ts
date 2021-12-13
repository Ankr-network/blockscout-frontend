import { makeStyles, Theme } from '@material-ui/core';

export const useFooterStyles = makeStyles<Theme>(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    [theme.breakpoints.up('lg')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 1fr',
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  rightSide: {
    justifyContent: 'end',
  },
  leftSide: {
    justifyContent: 'start',
  },
}));
