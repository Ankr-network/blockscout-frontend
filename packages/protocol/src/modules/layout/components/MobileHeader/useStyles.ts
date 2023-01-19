import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const MOBILE_HEADER_HEIGHT = 64;

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    position: 'fixed',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    zIndex: 2,
    padding: theme.spacing(2 * 1.25, 0),
  },

  container: {
    '&&': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(2 * 0, 2 * 2),
    },
  },
  switcher: {
    marginRight: theme.spacing(2 * 4.5),
    marginLeft: theme.spacing(2 * 1),
  },
  right: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    gap: theme.spacing(2 * 1),
  },
}));
