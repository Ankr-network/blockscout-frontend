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
    fontSize: 12,
    lineHeight: 1,
  },

  badgeIcon: {
    fontSize: 18,
  },

  claim: {
    fontSize: 16,
    height: 44,
    width: 104,
    marginLeft: 'auto',

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));
