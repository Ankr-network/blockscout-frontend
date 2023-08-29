import { makeStyles } from 'tss-react/mui';

export const usePlanStepStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(8),

    paddingTop: theme.spacing(6),
  },

  top: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(1.5),
  },
  cards: {
    display: 'flex',
    gap: theme.spacing(7.5),
  },
}));
