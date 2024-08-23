import { makeStyles } from 'tss-react/mui';

const name = 'Summary';

export const useSummaryStyles = makeStyles({ name })(theme => ({
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

    textWrap: 'nowrap',
  },
  icon: {
    color: theme.palette.text.secondary,
  },
  content: {
    width: 'fit-content',

    color: theme.palette.primary.main,

    letterSpacing: '-0.03em',

    [theme.breakpoints.down('sm')]: {
      letterSpacing: '-0.02em',

      fontSize: 24,
      lineHeight: 1.15,
    },
  },
  skeleton: {
    width: 100,
  },
}));
