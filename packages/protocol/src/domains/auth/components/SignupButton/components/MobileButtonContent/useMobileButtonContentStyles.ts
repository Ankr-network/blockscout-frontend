import { makeStyles } from 'tss-react/mui';

export const useMobileButtonContentStyles = makeStyles<
  void,
  'walletIconSmall'
>()((theme, _params, classes) => ({
  walletIconSmall: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    marginRight: 0,
    background: theme.palette.background.paper,
    borderRadius: '50%',
    width: 16,
    height: 16,
  },

  walletIconMobile: {
    display: 'none',

    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },

    [`+ .${classes.walletIconSmall}`]: {
      display: 'none',

      bottom: 2,
      right: 0,

      [theme.breakpoints.down('xs')]: {
        display: 'block',
      },
    },
  },

  walletIcon: {
    marginRight: theme.spacing(3),
    minWidth: 24,
  },

  oauthIcon: {
    '&&': {
      color: theme.palette.text.primary,
    },
  },

  email: {
    marginLeft: theme.spacing(2.5),
    color: theme.palette.primary.main,
  },
}));
