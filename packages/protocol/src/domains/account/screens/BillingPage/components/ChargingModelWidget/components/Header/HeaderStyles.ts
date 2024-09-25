import { makeStyles } from 'tss-react/mui';

const name = 'Header';

export const useHeaderStyles = makeStyles({ name })(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2.5),

    [theme.breakpoints.down('xs')]: {
      justifyContent: 'space-between',
    },
  },
  badges: {
    display: 'flex',
    gap: theme.spacing(1),
  },
}));
