import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    paddingBottom: theme.spacing(8),
  },
  title: {
    marginBottom: theme.spacing(8),
  },
}));
