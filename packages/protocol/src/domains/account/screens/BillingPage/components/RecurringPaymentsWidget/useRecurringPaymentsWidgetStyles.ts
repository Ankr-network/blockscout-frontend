import { makeStyles } from 'tss-react/mui';

export const useRecurringPaymentsWidgetStyles = makeStyles()(theme => ({
  root: {
    position: 'relative',

    borderRadius: 30,

    backgroundColor: theme.palette.background.paper,
  },
  price: {
    marginBottom: theme.spacing(6.5),
    span: {
      span: {
        fontSize: 14,
      },
    },
  },
}));
