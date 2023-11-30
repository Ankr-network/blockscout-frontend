import { makeStyles } from 'tss-react/mui';

export const useNetworksSelectorStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: theme.spacing(5),
  },
}));
