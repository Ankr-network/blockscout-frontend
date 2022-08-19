import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  chip: {
    height: '28px',
    borderRadius: '12px',
    fontSize: 12,
    backgroundColor: theme.palette.error.light,
    borderColor: 'transparent',
    color: theme.palette.error.main,
  },

  wrapper: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },

  switch: {
    fontSize: 16,
    height: 44,
    width: 156,

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));
