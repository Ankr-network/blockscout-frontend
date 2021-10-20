import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    marginTop: theme.spacing(10),
  },
  navigation: {
    margin: theme.spacing(7, 0, 8),
  },
  switcher: {
    maxWidth: '100%',
  },
}));
