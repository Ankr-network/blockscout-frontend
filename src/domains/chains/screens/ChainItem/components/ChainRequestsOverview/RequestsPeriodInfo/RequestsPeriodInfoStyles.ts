import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    textAlign: 'center',
  },
  description: {
    marginBottom: theme.spacing(1),
    fontSize: 14,
  },
  title: {
    fontSize: 30,
  },
}));
