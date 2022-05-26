import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  formGroup: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  inputBase: {
    fontSize: 14,
    borderRadius: 12,
    maxHeight: 44,
  },
  input: {
    minHeight: 44,
  },
}));
