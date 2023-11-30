import { makeStyles } from 'tss-react/mui';

export const useEmptyLayoutStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    height: '100%',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(8),
  },
  icon: {
    color: theme.palette.text.secondary,
    fontSize: 28,
  },
}));
