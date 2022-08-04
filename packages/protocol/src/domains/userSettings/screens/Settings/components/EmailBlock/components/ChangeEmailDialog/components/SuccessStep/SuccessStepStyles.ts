import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  description: {
    letterSpacing: '0.02em',
    fontSize: 20,
    color: theme.palette.grey[700],
    marginBottom: theme.spacing(3.75),
  },
}));
