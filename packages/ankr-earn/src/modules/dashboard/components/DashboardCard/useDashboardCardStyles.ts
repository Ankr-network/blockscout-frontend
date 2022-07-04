import { makeStyles } from '@material-ui/core';

export const useDashboardCardStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2.5),
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('sm')]: {
      minHeight: 220,
      padding: theme.spacing(3.75, 3.75, 2.75, 3.75),
    },
  },

  menuCol: {
    [theme.breakpoints.up('sm')]: {
      order: 1,
    },
  },

  menuSkeleton: {
    borderRadius: 6,
  },

  btnSkeleton: {
    borderRadius: 12,
  },
}));
