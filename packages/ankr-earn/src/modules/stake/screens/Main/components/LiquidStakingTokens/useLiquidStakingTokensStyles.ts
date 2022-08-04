import { makeStyles, Theme } from '@material-ui/core';

export const useLiquidStakingTokensStyles = makeStyles<Theme>(theme => ({
  title: {
    fontSize: 20,
    marginBottom: theme.spacing(2.5),

    [theme.breakpoints.up('sm')]: {
      fontSize: 24,
      marginBottom: theme.spacing(4),
    },
  },
}));
