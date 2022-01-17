import { makeStyles, Theme } from '@material-ui/core';

export const useStakeSuccessDialogStyles = makeStyles<Theme>(theme => ({
  wrapper: {
    maxWidth: 360,

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 0),
    },
  },

  title: {
    fontSize: 30,
    marginBottom: theme.spacing(3),
  },

  text: {
    fontSize: 18,
    marginBottom: theme.spacing(6.25),
  },
}));
