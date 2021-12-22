import { makeStyles, Theme } from '@material-ui/core';

export const SIDEBAR_WIDTH = 220;
export const SIDEBAR_HEIGHT = 785;

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    width: SIDEBAR_WIDTH,
    position: 'fixed',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    padding: theme.spacing(4, 2),
    display: 'flex',
    flexDirection: 'column',
    minHeight: SIDEBAR_HEIGHT,
    height: '100%',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
    marginTop: theme.spacing(5),
  },
}));
