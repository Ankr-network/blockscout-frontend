import { makeStyles } from 'tss-react/mui';

export const useTitleStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(4),
  },
  title: {
    color: theme.palette.text.primary,

    letterSpacing: '-0.03em',
  },
}));
