import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  title: {
    color: theme.palette.grey[900],
  },
  subtitle: {
    color: theme.palette.text.secondary,
  },
}));
