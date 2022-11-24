import { makeStyles, Theme } from '@material-ui/core';

export const SIDEBAR_WIDTH = 220;

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'fixed',

    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),

    width: SIDEBAR_WIDTH,
    height: '100%',
    padding: theme.spacing(4, 2),

    backgroundColor: theme.palette.background.paper,
  },
}));
