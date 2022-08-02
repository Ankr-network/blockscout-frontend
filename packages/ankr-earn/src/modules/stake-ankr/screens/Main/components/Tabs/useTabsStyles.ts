import { makeStyles } from '@material-ui/core';

export const useTabsStyles = makeStyles(theme => ({
  btn: {
    height: 40,
    backgroundColor: 'transparent',

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 0, 0, 1.5),
    },

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));
