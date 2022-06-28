import { makeStyles } from '@material-ui/core';

export const useRewardsItemStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',

    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
    },
  },

  btn: {
    height: 50,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    margin: theme.spacing(0.5, 0, 0.5, 0.5),

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 0, 0, 1.5),
    },
  },

  btnWrapper: {
    display: 'flex',
  },
}));
