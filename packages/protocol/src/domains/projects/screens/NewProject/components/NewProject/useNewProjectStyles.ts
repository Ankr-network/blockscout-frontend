import { makeStyles } from 'tss-react/mui';

export const useNewProjectStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(8),
    borderRadius: 30,
  },
}));
