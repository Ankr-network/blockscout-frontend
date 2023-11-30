import { makeStyles } from 'tss-react/mui';

export const useWhitelistTablePlaceholderStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(6),

    paddingTop: theme.spacing(6),

    borderTop: `1px solid ${theme.palette.divider}`,
  },
  button: {
    height: 48,
    borderRadius: 16,

    padding: theme.spacing(3, 5, 3, 6),

    letterSpacing: '-0.01em',

    fontSize: 16,
    fontWeight: 600,
    lineHeight: '150%',
  },
  icon: {
    marginLeft: theme.spacing(2),

    '&& svg': {
      fontSize: 24,
    },
  },
}));
