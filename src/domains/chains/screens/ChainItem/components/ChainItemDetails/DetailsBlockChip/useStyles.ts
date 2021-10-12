import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    height: 26,
  },

  colorPrimary: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.main,
  },
  colorSecondary: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.main,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 8,
    marginLeft: 11,
  },
  successIcon: {
    color: theme.palette.success.main,
  },
  errorIcon: {
    color: theme.palette.error.main,
    marginTop: -2,
  },
}));
