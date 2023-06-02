import { makeStyles } from 'tss-react/mui';

export const useUsageHistoryWidgetStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    padding: theme.spacing(6, 11.25, 6, 6),

    borderRadius: 30,

    background: theme.palette.background.paper,

    [theme.breakpoints.down('xl')]: {
      gap: theme.spacing(3),

      padding: theme.spacing(5),
    },
  },
}));