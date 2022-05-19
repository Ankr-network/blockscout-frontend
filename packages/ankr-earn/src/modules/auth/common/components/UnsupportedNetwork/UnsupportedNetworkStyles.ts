import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useUnsupportedNetworkStyles = makeStyles<Theme>(theme => ({
  paper: {
    padding: theme.spacing(5, 4),
  },

  header: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    fontWeight: 400,
  },
}));
