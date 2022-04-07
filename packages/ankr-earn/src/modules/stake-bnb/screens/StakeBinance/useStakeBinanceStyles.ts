import { makeStyles } from '@material-ui/core';

export const useStakeBinanceStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 0),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 0),
    },
  },

  questionBtn: {
    margin: theme.spacing(0, 0, 0, 0.75),
  },
}));
