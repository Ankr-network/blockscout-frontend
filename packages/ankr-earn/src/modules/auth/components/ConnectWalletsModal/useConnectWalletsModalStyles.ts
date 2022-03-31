import { makeStyles } from '@material-ui/core';

export const useConnectWalletsModalStyles = makeStyles(theme => ({
  root: {
    maxWidth: 660,
    minWidth: 660,
  },

  container: {
    margin: 0,
    padding: 0,
  },

  title: {
    padding: theme.spacing(0, 0, 5, 0),
  },

  loading: {
    position: 'relative',
    padding: theme.spacing(5, 5, 5, 5),
  },

  walletItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 160,
    maxHeight: 144,
    width: 160,
    height: 144,
    margin: theme.spacing(1.25, 1.25, 1.25, 1.25),
    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: 18,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
    '&:hover > h6': {
      textDecoration: 'underline',
    },
  },
  walletItemTitle: {
    margin: theme.spacing(2.25, 0, 0, 0),
    fontSize: 14,
  },
  walletItemInstall: {
    margin: theme.spacing(0.5, 0, 0, 0),
    color: theme.palette.primary.main,
    fontSize: 13,
    fontWeight: 700,
  },
}));
