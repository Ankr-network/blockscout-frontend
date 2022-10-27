import { makeStyles } from '@material-ui/core';

export const useLiquidStakingTokensStyles = makeStyles(theme => ({
  title: {
    fontSize: 20,
    marginBottom: theme.spacing(2.5),
    lineHeight: '100%',

    [theme.breakpoints.up('sm')]: {
      fontSize: 30,
      marginBottom: theme.spacing(4),
    },
  },

  ssvIcon: {
    margin: theme.spacing(-10.125, 0, -10.125, 0),
    fontSize: 226,
  },
}));
