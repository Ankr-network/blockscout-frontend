import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles({ name: 'Header' })(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(6, 5, 4, 5),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  button: {
    border: 'none',
  },
  icon: {
    color: theme.palette.grey[600],
  },
}));
