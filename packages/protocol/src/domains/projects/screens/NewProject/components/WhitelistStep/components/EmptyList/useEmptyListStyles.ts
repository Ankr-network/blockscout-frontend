import { makeStyles } from 'tss-react/mui';

export const useEmptyListStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 618,
    margin: 'auto',
  },
  image: {
    height: 180,
    width: 180,
    marginBottom: theme.spacing(8),
  },
  title: {
    fontSize: 28,
    paddingBottom: theme.spacing(4),
    width: '100%',
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    marginBottom: theme.spacing(5),
    textAlign: 'center',
  },
  description: {
    maxWidth: 506,
    marginBottom: theme.spacing(8),
  },
}));
