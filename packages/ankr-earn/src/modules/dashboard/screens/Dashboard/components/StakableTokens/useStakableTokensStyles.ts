import { makeStyles } from '@material-ui/core';

export const useStakableTokensStyles = makeStyles(theme => ({
  title: {
    fontSize: 24,
    marginBottom: theme.spacing(2.5),

    [theme.breakpoints.up('sm')]: {
      fontSize: 30,
      marginBottom: theme.spacing(4),
    },
  },

  skeleton: {
    minWidth: 212,
    width: '100%',
    height: 140,
  },
}));
