import { makeStyles, Theme } from '@material-ui/core';

import { SIDEBAR_WIDTH } from '../SideBar';

export const HEADER_HEIGHT = 121;

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(4, 0),
    color: theme.palette.text.primary,
    position: 'fixed',
    width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
  },

  container: {
    padding: theme.spacing(0, 3.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switcher: {
    marginRight: theme.spacing(4.5),
    marginLeft: theme.spacing(1),
  },
  right: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
