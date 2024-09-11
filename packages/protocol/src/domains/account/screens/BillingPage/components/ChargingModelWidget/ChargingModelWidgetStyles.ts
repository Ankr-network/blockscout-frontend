import { makeStyles } from 'tss-react/mui';

const name = 'ChargingModelWidget';

export const useChargingModelWidgetStyles = makeStyles({ name })(theme => ({
  root: {},
  content: {},
  header: {
    marginBottom: theme.spacing(8),

    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(6),
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
      marginTop: theme.spacing(6),

      width: '100%',
    },
  },
}));
