import { makeStyles, Theme } from '@material-ui/core';

export const SIDEBAR_WIDTH = 220;

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    width: SIDEBAR_WIDTH,
    minHeight: 785,
    padding: theme.spacing(4, 2),
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
    marginTop: theme.spacing(5),
  },
}));
