import { Theme, makeStyles } from '@material-ui/core';

export const useRequestsChartStyles = makeStyles<Theme>(theme => ({
  requestsChart: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3.75),

    padding: theme.spacing(3.75),

    borderRadius: theme.spacing(3.75),

    background: theme.palette.background.paper,

    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(2.5),

      padding: theme.spacing(2.5),

      borderRadius: theme.spacing(2.5),
    },
  },
  content: {
    position: 'relative',

    height: theme.spacing(33.75),
  },
}));
