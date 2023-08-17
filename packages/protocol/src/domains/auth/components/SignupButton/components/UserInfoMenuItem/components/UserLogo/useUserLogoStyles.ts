import { makeStyles } from 'tss-react/mui';

export const useUserLogoStyles = makeStyles()(theme => ({
  userLogo: {
    position: 'relative',
    marginRight: theme.spacing(2.5),
    display: 'inline-flex',
    alignItems: 'center',
  },

  walletIconBig: {
    '&, & svg, & img': {
      width: 28,
      height: 28,
      color: theme.palette.text.primary,
    },
  },

  walletIconSmall: {
    position: 'absolute',
    bottom: -2,
    marginRight: 0,
    background: theme.palette.background.paper,
    borderRadius: '50%',
    width: 12,
    height: 12,
    color: 'inherit',
  },
}));
