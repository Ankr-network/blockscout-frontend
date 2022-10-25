import { makeStyles, Theme } from '@material-ui/core';

export const useDelegateStakingTokensStyles = makeStyles<Theme>(theme => ({
  title: {
    fontSize: 20,
    marginBottom: theme.spacing(2.5),
    lineHeight: '100%',

    [theme.breakpoints.up('sm')]: {
      fontSize: 30,
      marginBottom: theme.spacing(4),
    },
  },
}));
