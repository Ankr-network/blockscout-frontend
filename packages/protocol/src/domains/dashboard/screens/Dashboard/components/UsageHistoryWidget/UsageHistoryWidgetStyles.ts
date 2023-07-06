import { makeStyles } from 'tss-react/mui';

export const useUsageHistoryWidgetStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(5),

    borderRadius: 30,

    background: theme.palette.background.paper,

    [theme.breakpoints.down('xl')]: {
      gap: theme.spacing(3),

      padding: theme.spacing(5),
    },
  },
  isHidden: {
    [theme.breakpoints.up('xl')]: {
      display: 'none',
    },
  },
}));
