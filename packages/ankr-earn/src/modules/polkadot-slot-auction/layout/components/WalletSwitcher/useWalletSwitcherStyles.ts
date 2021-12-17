import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useWalletSwitcherStyles = makeStyles<Theme>(theme => ({
  button: {
    width: theme.spacing(22),
    padding: theme.spacing(0, 2, 0),
  },
  walletSelected: {
    background: 'rgba(255,255,255,0.15)',

    '&:hover': {
      background: 'rgba(255,255,255,0.15) !important',
    },
  },
  menu: {
    width: theme.spacing(22),
    marginTop: theme.spacing(6),
  },
  menuList: {
    '& > li': {
      padding: theme.spacing(1, 2),
    },
  },
}));
