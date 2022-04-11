import { makeStyles } from '@material-ui/core';

export const useUnclaimedAssetStyles = makeStyles(theme => ({
  badge: {
    display: 'inline-grid',
    alignItems: 'center',
    gridTemplateColumns: 'auto 1fr',
    gap: theme.spacing(0, 1),

    padding: theme.spacing(0.5, 1.25),
    borderRadius: 30,
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
    fontSize: 13,
    lineHeight: 1,
  },

  badgeIcon: {
    fontSize: 18,
  },
}));
