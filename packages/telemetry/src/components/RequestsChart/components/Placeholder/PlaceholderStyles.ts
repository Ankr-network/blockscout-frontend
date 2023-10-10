import { makeStyles } from 'tss-react/mui';

export const usePlaceholderStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    height: '100%',
  },
  title: {
    marginBottom: theme.spacing(4),

    color: theme.palette.text.primary,
    letterSpacing: '-0.01em',

    fontWeight: 700,
    fontSize: theme.spacing(6),
    lineHeight: theme.spacing(8),
  },
  subtitle: {
    maxWidth: theme.spacing(150),

    color: theme.palette.grey[600],
    textAlign: 'center',

    fontWeight: 400,
    fontSize: 16,
    lineHeight: theme.spacing(6),
  },
}));
