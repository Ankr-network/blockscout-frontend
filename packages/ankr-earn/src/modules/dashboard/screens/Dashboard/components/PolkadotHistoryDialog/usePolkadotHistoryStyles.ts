import { makeStyles } from '@material-ui/core';

export const usePolkadotHistoryStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4, 0, 4),
    maxWidth: 600,
  },

  empty: {
    margin: 'auto',
    padding: theme.spacing(14, 0, 22),
    textAlign: 'center',
    color: theme.palette.action.disabledBackground,
    fontSize: 22,
  },
}));
