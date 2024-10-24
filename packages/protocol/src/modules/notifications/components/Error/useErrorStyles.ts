import { makeStyles } from 'tss-react/mui';

export const useErrorStyles = makeStyles({ name: 'Error' })(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
  },
}));
