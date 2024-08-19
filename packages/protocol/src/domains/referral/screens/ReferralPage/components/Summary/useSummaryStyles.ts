import { makeStyles } from 'tss-react/mui';

export const useSummaryStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(2),
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),

    color: theme.palette.text.secondary,
  },
  icon: {
    color: theme.palette.text.secondary,
  },
  content: {
    color: theme.palette.primary.main,

    letterSpacing: '-0.03em',

    [theme.breakpoints.down('sm')]: {
      letterSpacing: '-0.02em',

      fontSize: 24,
      lineHeight: 1.15,
    },
  },
}));
