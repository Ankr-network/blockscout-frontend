import { makeStyles } from 'tss-react/mui';

const name = 'SummaryWidget';

export const useSummaryWidgetStyles = makeStyles({ name })(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(8),
    flex: 1,

    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(5),
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(2),

    color: theme.palette.text.primary,
  },
}));
