import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { SHOULD_SHOW_HEADER_BANNER } from 'modules/layout/const';

export const MOBILE_HEADER_HEIGHT = 64;

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    position: 'fixed',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    zIndex: 2,
    padding: theme.spacing(2.5, 0),
    top: SHOULD_SHOW_HEADER_BANNER ? 40 : 0,
  },

  container: {
    '&&': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(0, 4),
    },

    /* globalMenu width fix */
    '&>div:first-of-type': {
      width: 'auto',
    },
  },
  switcher: {
    marginRight: theme.spacing(9),
    marginLeft: theme.spacing(2),
  },
  right: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },

  accountStatus: {
    marginLeft: theme.spacing(3),
    marginRight: 'auto',
  },
}));
