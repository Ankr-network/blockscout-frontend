import { makeStyles } from '@material-ui/core';

export const useMainStyles = makeStyles(theme => ({
  addTokens: {
    marginBottom: theme.spacing(3),

    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(5),
      order: 1,
    },
  },
}));
