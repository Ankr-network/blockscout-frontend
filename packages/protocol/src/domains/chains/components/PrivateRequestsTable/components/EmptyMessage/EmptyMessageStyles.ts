import { makeStyles } from 'tss-react/mui';

export const useEmptyMessageStyles = makeStyles()(theme => ({
  root: {
    height: theme.spacing(52),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    height: '100%',

    textAlign: 'center',
    color: theme.palette.grey[600],

    fontWeight: 400,
  },
}));
