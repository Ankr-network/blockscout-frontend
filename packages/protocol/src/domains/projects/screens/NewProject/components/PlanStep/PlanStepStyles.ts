import { makeStyles } from 'tss-react/mui';

export const usePlanStepStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(8),

    paddingTop: theme.spacing(10),
  },
  title: {
    color: theme.palette.grey[900],

    letterSpacing: '-0.03em',

    fontWeight: 700,
    fontSize: 28,
    lineHeight: '31px',
  },
  cards: {
    display: 'flex',
    gap: theme.spacing(5),
  },
}));
