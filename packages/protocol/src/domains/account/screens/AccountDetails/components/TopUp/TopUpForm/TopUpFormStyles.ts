import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  formGroup: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  form: {
    [theme.breakpoints.down('sm')]: {
      gap: 6,
      display: 'flex',
    },
  },
  inputBase: {
    fontSize: 14,
    borderRadius: 12,
  },
  input: {
    minHeight: 44,
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: 86,
    },
  },
}));
