import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useSignupButtonStyles = makeStyles<boolean, 'walletIconSmall'>()(
  (theme: Theme, isMobile: boolean, classes) => ({
    menuButton: isMobile
      ? {
          fontSize: 12,
          position: 'relative',
          width: 'auto',
          padding: theme.spacing(2 * 1.25, 2 * 1.5),

          border: `2px solid ${theme.palette.divider}`,
          borderRadius: theme.spacing(2 * 1.5),

          color: theme.palette.text.primary,

          [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(),
            minWidth: 40,

            color: theme.palette.grey[600],
          },
        }
      : {
          position: 'relative',

          flexShrink: 0,

          width: 'auto',

          backgroundColor: theme.palette.background.paper,
        },
    button: {
      [theme.breakpoints.down('sm')]: {
        border: '2px solid rgba(31, 34, 38, 0.1)',
      },
    },
    walletIcon: {
      marginRight: theme.spacing(2 * 1.5),
      minWidth: 24,
    },
    bottom: {
      display: 'flex',
      alignItems: 'center',
      padding: 0,
      position: 'relative',

      '& button': {
        height: 64,
        borderRadius: 0,
      },

      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        background: theme.palette.grey[100],
        height: 1,
        top: 0,
        left: 20,
        width: 'calc(100% - 40px)',
        zIndex: 1,
      },
    },

    connectWallet: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      height: 64,

      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        background: theme.palette.grey[100],
        height: 1,
        top: 0,
        left: 20,
        width: 'calc(100% - 40px)',
        zIndex: 1,
      },
    },

    connectWalletButton: {
      color: theme.palette.text.primary,

      '& svg': {
        color: theme.palette.grey['600'],
      },
    },
    top: {
      '&.MuiListItem-button:hover': {
        backgroundColor: theme.palette.background.paper,
      },
    },
    topContainer: {
      position: 'relative',
    },
    email: {
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(2 * 1),
      overflow: 'hidden',
      width: '100%',
    },
    emailText: {
      fontWeight: 700,
    },
    signoutButton: {
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing(2 * 1),
      minWidth: 'auto',
    },
    menu: {
      padding: 0,

      '& li:active': {
        transform: `translateY(0)`,
      },
    },
    menuItem: {
      padding: 0,
    },
    userLogo: {
      position: 'relative',
      marginRight: theme.spacing(2 * 1.5),
    },
    userData: {
      maxWidth: '100%',
      overflow: 'hidden',
    },
    walletIconBig: {
      width: 30,
      height: 30,
    },
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
    subtitle: {
      fontSize: 14,
    },
    desktopButtonContent: {
      display: 'none',

      [theme.breakpoints.up('xs')]: {
        display: 'flex',
      },
    },
    mobileButtonContent: {
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
  }),
);