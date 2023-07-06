import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    letterSpacing: '-0.01em',

    fontWeight: 700,
    fontSize: 14,
    lineHeight: '24px',

    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-start',
    },
  },
  title: {
    color: theme.palette.grey[900],
    fontSize: 16,
  },
  requests: {
    display: 'flex',
    gap: theme.spacing(4),

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      gap: theme.spacing(),
    },
  },
  detailedRequests: {
    display: 'flex',
    gap: theme.spacing(),
    alignItems: 'center',

    color: theme.palette.grey[600],

    fontWeight: 400,

    strong: {
      color: theme.palette.grey[900],

      fontWeight: 700,
    },

    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-end',
    },
  },
}));
