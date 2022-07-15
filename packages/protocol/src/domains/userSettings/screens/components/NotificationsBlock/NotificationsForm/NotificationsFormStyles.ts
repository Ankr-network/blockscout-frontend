import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  balanceCheckbox: {
    marginBottom: theme.spacing(10),
  },
  description: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(2.5),
  },
  label: {
    marginTop: 2,
  },
}));
