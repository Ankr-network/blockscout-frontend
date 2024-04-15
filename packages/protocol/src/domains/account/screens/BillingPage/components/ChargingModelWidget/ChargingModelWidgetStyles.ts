import { makeStyles } from 'tss-react/mui';

export const useChargingModelWidgetStyles = makeStyles()(theme => ({
  root: {},
  content: {},
  header: {
    marginBottom: theme.spacing(10),

    [theme.breakpoints.down('xs')]: {
      '&&&': {
        marginBottom: theme.spacing(8),
      },
    },
  },
  balance: {},
  widgetActions: {
    right: 194,
  },
  balanceProgressBar: {
    marginTop: theme.spacing(3),
  },

  assetsBtn: {
    marginLeft: 'auto',
    whiteSpace: 'nowrap',

    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(4),
      width: '100%',
    },
  },
}));
