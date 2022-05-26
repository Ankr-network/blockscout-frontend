import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  form: {
    [theme.breakpoints.down('sm')]: {
      gap: 6,
      display: 'flex',
    },
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: 86,
    },
  },
}));
