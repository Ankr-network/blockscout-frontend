import { makeStyles } from 'tss-react/mui';

export const useDefaultContentStyles = makeStyles()(theme => ({
  title: {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(7.5),
  },
  text: {
    color: theme.palette.text.primary,
  },
  balance: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: theme.spacing(5, 0),
    border: `2px solid ${theme.palette.error.main}`,
    borderRadius: 20,
    padding: theme.spacing(4),
    gap: theme.spacing(3),
  },
  icon: {
    color: theme.palette.error.main,
  },
  balanceText: {
    color: theme.palette.error.main,
  },
  tip: {
    display: 'block',
    color: theme.palette.text.secondary,
    margin: theme.spacing(5, 0, 7.5, 0),
  },
  button: {
    marginBottom: theme.spacing(5),
  },
}));
