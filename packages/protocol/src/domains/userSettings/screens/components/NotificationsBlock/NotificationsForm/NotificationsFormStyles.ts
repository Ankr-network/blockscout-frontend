import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  balanceTitle: {
    marginBottom: theme.spacing(1.5),
    fontWeight: 700,
  },
  balanceCheckbox: {
    marginBottom: theme.spacing(10),
  },
  description: {
    marginLeft: theme.spacing(3),
  },
  divider: {
    margin: theme.spacing(3.5, 0, 3),
  },
  label: {
    marginTop: 2,
  },
}));
