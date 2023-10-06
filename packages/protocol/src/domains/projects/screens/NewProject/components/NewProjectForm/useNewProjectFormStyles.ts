import { makeStyles } from 'tss-react/mui';

export const useNewProjectFormStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(8),
    borderRadius: 30,
  },
  contentWrapper: {
    paddingBottom: theme.spacing(10),
  },
}));
