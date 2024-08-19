import { makeStyles } from 'tss-react/mui';

export const useSummaryWidgetStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(8),

    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(5),
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    color: theme.palette.text.primary,
  },
}));
