import { makeStyles } from 'tss-react/mui';

export const useSubscriptionsWidgetStyles = makeStyles()(theme => ({
  root: {
    position: 'relative',

    padding: theme.spacing(8),

    borderRadius: 30,

    backgroundColor: theme.palette.background.paper,
  },
  price: {
    marginBottom: theme.spacing(6.5),
  },
}));
