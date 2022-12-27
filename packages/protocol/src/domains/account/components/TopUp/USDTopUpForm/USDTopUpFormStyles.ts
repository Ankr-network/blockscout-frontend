import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  rootForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  form: {
    [theme.breakpoints.down('sm')]: {
      gap: 6,
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: 86,
    },

    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
}));
