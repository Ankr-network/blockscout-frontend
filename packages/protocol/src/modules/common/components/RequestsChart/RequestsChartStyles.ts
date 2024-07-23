import { makeStyles } from 'tss-react/mui';

export const useRequestsChartStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(7.5),

    height: '100%',
    padding: theme.spacing(7.5),

    borderRadius: theme.spacing(5),

    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,

    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(5),

      padding: theme.spacing(5),

      borderRadius: theme.spacing(5),
    },
  },
  content: {
    position: 'relative',
    overflow: 'hidden',

    height: '100%',
  },
}));
