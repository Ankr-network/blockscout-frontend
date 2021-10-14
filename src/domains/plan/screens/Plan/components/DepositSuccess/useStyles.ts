import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    margin: '0 auto',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(7.5, 10),
    borderRadius: 18,
    maxWidth: 560,
  },
  topTitle: {
    marginBottom: theme.spacing(2.5),
  },
  icon: {
    fontSize: '16px !important',
  },
  button: {
    minWidth: 190,
    marginTop: theme.spacing(7),
  },
}));
