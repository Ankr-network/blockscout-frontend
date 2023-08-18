import { makeStyles } from 'tss-react/mui';

export const useLoadingStateStyles = makeStyles()(theme => ({
  root: {
    textAlign: 'center',

    '& svg': {
      color: 'inherit',
    },
  },
  title: {
    marginTop: theme.spacing(2 * 1.5),
    marginBottom: theme.spacing(2 * 1.5),
    fontSize: 28,
  },
}));
