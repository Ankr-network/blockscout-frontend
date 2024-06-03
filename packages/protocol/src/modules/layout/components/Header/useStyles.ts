import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { SIDEBAR_WIDTH } from '../SideBar';

export const HEADER_HEIGHT = 121;

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3, 0),
    color: theme.palette.text.primary,
    position: 'fixed',
    width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
    zIndex: 1,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switcher: {
    marginRight: theme.spacing(9),
    marginLeft: theme.spacing(2),
    maxWidth: 180,
  },
  right: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    gap: theme.spacing(3),

    marginLeft: theme.spacing(2),
  },
}));
