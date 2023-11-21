import { makeStyles } from 'tss-react/mui';

export const useRequestsInfoStyles = makeStyles()(theme => ({
  chart: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: theme.spacing(8),
  },
  requestsCount: {
    display: 'flex',
    flexDirection: 'column',
  },

  count: {
    letterSpacing: '-0.84px',
  },

  percent: {
    fontWeight: 500,
    color: theme.palette.error.main,
  },

  requestsChart: {
    marginRight: theme.spacing(10),
  },
}));
