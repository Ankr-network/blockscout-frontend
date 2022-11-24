import { makeStyles } from '@material-ui/core';

export const useStakeSuiStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 0),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 0),
    },
  },
}));
