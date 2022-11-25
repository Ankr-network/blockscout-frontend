import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  form: {
    [theme.breakpoints.down('sm')]: {
      gap: 6,
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
  button: {
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      maxWidth: 86,
    },

    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
}));
