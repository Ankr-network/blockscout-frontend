import { makeStyles } from 'tss-react/mui';

export const useSeparatedListStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
  },
}));
