import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles()(theme => ({
  title: {
    marginBottom: theme.spacing(8),
  },
}));
