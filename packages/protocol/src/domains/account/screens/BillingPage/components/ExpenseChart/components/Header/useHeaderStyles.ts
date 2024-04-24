import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles()(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(3.75),
  },
  left: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(2.5),
  },
  title: {
    color: theme.palette.text.primary,

    letterSpacing: '-0.03em',
  },
  currency: {
    padding: theme.spacing(1, 2),

    borderRadius: 18,
    border: `1px solid ${theme.palette.action.disabledBackground}`,

    color: theme.palette.grey[600],
    letterSpacing: '0.02em',

    fontWeight: 400,
    fontSize: 11,
    lineHeight: theme.spacing(4),
  },
}));
