import { makeStyles } from '@material-ui/core';

export const useRewardsItemStyles = makeStyles(theme => ({
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
    flexWrap: 'wrap',

    [theme.breakpoints.up('md')]: {
      flexWrap: 'nowrap',
    },
  },
}));
