import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useRequestsChartStyles = makeStyles()((theme: Theme) => ({
  requestsChart: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2 * 3.75),

    padding: theme.spacing(2 * 3.75),

    borderRadius: theme.spacing(2 * 3.75),

    background: theme.palette.background.paper,

    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(2 * 2.5),

      padding: theme.spacing(2 * 2.5),

      borderRadius: theme.spacing(2 * 2.5),
    },
  },
  content: {
    position: 'relative',

    height: theme.spacing(2 * 33.75),
  },
}));
