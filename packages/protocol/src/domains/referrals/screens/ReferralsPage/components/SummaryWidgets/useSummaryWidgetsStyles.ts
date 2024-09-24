import { makeStyles } from 'tss-react/mui';

const name = 'SummaryWidgets';

export const useSummaryWidgetsStyles = makeStyles({ name })(theme => ({
  root: {
    display: 'flex',
    gap: theme.spacing(7.5),
    flex: 1,

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: theme.spacing(6),
    },
  },
}));
