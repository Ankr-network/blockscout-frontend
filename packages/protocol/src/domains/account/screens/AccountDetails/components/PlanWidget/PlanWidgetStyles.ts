import { makeStyles } from 'tss-react/mui';

export const usePlanWidgetStyles = makeStyles()(theme => ({
  title: {
    marginBottom: theme.spacing(4),

    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(8),
    },
  },
  price: {
    marginBottom: theme.spacing(4),

    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(8),
    },
  },
  endDate: {
    marginBottom: theme.spacing(6.75),

    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(5),
    },
  },
}));
