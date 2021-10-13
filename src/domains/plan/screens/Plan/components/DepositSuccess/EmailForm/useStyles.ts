import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    marginTop: theme.spacing(9),
  },
  info: {
    fontWeight: 500,

    '&:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
  checkbox: {},
  buttons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, auto)',
    columnGap: 20,
  },
  button: {
    minWidth: 190,
    marginTop: theme.spacing(2.5),
  },
}));
