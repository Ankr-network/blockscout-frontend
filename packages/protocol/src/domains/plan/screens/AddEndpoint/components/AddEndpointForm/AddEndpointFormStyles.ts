import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    marginTop: 40,
    maxWidth: 820,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  top: {
    marginBottom: theme.spacing(5),
    color: theme.palette.text.primary,
    padding: 0,
  },
  bottom: {
    maxWidth: '40%',

    [theme.breakpoints.down('lg')]: {
      marginTop: theme.spacing(2),
      maxWidth: '100%',
    },
  },
  divider: {
    margin: theme.spacing(3.5, 0),
  },
}));
