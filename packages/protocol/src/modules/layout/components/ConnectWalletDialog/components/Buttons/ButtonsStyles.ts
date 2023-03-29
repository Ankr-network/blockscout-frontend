import { makeStyles } from 'tss-react/mui';

export const useButtonsStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
  },
  connectButton: {
    width: '100%',
    height: 48,

    borderRadius: 17,

    letterSpacing: '-0.01em',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '24px',
  },
  logoutButton: {
    width: '100%',
    height: 44,

    borderRadius: 17,

    letterSpacing: '-0.01em',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '24px',
  },
}));
