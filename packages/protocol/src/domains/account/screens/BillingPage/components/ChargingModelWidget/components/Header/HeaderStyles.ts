import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2.5),
  },
  badges: {
    display: 'flex',
    gap: theme.spacing(1),
  },
}));
