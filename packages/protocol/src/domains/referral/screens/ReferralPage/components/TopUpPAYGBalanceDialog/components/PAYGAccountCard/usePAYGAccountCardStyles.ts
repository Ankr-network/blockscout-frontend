import { makeStyles } from 'tss-react/mui';

const name = 'PAYGAccountCard';

export const usePAYGAccountCardStyles = makeStyles({ name })(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  title: {
    color: theme.palette.text.primary,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),

    padding: theme.spacing(4),

    borderRadius: theme.shape.borderRadius,

    backgroundColor: theme.palette.primary.light,
  },
  balance: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
  credits: {
    color: theme.palette.text.primary,
  },
  requests: {
    color: theme.palette.text.secondary,

    fontWeight: 500,
  },
}));
