import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
    },
  },
}));
