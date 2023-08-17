import { makeStyles } from 'tss-react/mui';

const MIN_WIDTH = 32;

export const useGoogleMenuItemStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    padding: theme.spacing(2, 4),

    '& button': {
      height: 36,
      minHeight: 36,
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
      width: `calc(100% - ${MIN_WIDTH}px)`,
      zIndex: 1,
    },
  },

  walletIcon: {
    minWidth: 24,
    display: 'inline-flex',
    alignItems: 'center',
  },

  connectWalletButton: {
    color: theme.palette.text.primary,
    padding: 0,

    '& svg': {
      color: theme.palette.text.primary,
    },

    '&:hover': {
      background: 'transparent',
    },
  },

  content: {
    fontWeight: 500,
    color: theme.palette.primary.main,
    lineHeight: 1.2,
  },
}));
