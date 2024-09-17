import { makeStyles } from 'tss-react/mui';

const name = 'TotalPointsWidget';

export const useTotalPointsWidgetStyles = makeStyles({ name })(theme => ({
  stats: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(7.5),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: theme.spacing(4),
    },
  },
}));
