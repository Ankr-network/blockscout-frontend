import { makeStyles } from 'tss-react/mui';

export const useRequestsWidgetStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
  },
  left: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  title: {
    marginRight: theme.spacing(2),
    fontSize: 16,
  },
  button: {
    display: 'flex',
    gap: theme.spacing(2),
    height: 30,
    minHeight: 30,
  },
  timeframe: {
    marginLeft: 'auto',
    height: 28,

    '&&': {
      borderRadius: 10,
    },
  },
  tab: {
    height: 24,
    minHeight: 24,
  },
  icon: {
    '& > path': {
      strokeWidth: 2,
    },
  },
}));
