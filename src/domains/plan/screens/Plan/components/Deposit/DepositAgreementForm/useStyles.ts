import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {},
  info: {
    fontWeight: 500,

    '&:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
  checkbox: {},
  button: {
    minWidth: 210,
    marginTop: theme.spacing(2.5),
  },
}));
