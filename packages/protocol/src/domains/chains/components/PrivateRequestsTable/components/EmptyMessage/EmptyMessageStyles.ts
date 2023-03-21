import { makeStyles } from 'tss-react/mui';

export const useEmptyMessageStyles = makeStyles()(theme => ({
  root: {
    height: '100%',
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    height: '100%',

    whiteSpace: 'pre-wrap',
    textAlign: 'center',
    color: theme.palette.grey[600],

    fontWeight: 400,
  },
}));
