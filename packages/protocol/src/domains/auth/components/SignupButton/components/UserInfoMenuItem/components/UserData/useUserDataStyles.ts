import { makeStyles } from 'tss-react/mui';

export const useUserDataStyles = makeStyles()(theme => ({
  root: {
    maxWidth: '100%',
    display: 'inline-flex',
    flexDirection: 'column',
  },

  title: {
    fontWeight: 500,
    color: theme.palette.primary.main,
    lineHeight: 1.2,
  },

  subtitle: {
    fontSize: 12,
    fontWeight: 500,
  },
}));
