import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    padding: '20vh 0',
  },

  title: {
    marginBottom: theme.spacing(2),
  },

  button: {
    minWidth: 180,
  },
}));
