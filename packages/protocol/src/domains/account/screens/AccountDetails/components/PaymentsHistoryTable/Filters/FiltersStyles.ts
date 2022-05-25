import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    width: 370,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(1),

    [theme.breakpoints.down('xs')]: {
      alignSelf: 'flex-end',
    },
  },
}));
