import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(7.5, 15, 7.5, 10.5),
    borderRadius: 18,
  },
  topTitle: {
    marginBottom: theme.spacing(2.5),
  },
  bottomTitle: {
    fontSize: 60,
    maxWidth: 728,
  },
  icon: {
    fontSize: '16px !important',
  },
  button: {
    marginTop: theme.spacing(7),
  },
}));
