import { makeStyles, Theme } from '@material-ui/core';

interface IHeight {
  size: 'm' | 'l';
}

export const useStyles = makeStyles<Theme, IHeight>(theme => ({
  formGroup: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  inputBase: {
    fontSize: 14,
    borderRadius: 12,
    maxHeight: ({ size }) => (size === 'l' ? 48 : 44),
  },
  input: {
    minHeight: ({ size }) => (size === 'l' ? 48 : 44),
  },
}));
