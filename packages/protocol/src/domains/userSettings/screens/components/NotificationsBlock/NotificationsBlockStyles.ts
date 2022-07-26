import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    borderRadius: 30,
  },
  title: {
    marginBottom: theme.spacing(4),
  },
}));
