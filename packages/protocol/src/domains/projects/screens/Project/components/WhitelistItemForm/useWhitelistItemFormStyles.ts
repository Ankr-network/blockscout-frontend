import { makeStyles } from 'tss-react/mui';

export const useWhitelistItemFormStyles = makeStyles()(theme => ({
  title: {
    marginBottom: theme.spacing(3),
  },
  description: {
    marginBottom: theme.spacing(4),
  },
  counter: {
    marginBottom: theme.spacing(8),
  },
  input: {
    marginBottom: theme.spacing(6),
  },
  selector: {},
}));
