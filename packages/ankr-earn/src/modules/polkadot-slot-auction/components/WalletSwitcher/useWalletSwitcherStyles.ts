import { lighten, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useWalletSwitcherStyles = makeStyles<Theme>(theme => ({
  button: {
    width: theme.spacing(22),
    margin: theme.spacing(0, 0, 0, 3),
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    fontWeight: 400,

    '&:active': {
      transform: 'none',
    },
    '&:hover': {
      color: 'inherit',
      border: `1px solid ${lighten(theme.palette.text.secondary, 0.7)}`,
    },
  },
  walletSelected: {
    '&:hover': {
      color: `${theme.palette.text.primary} !important`,
    },
  },
  menu: {
    position: 'relative',
    width: theme.spacing(22),
    marginTop: theme.spacing(6),
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    border: '1px solid #e2e7f0',
    borderRadius: 8,
    boxShadow: 'none',
  },
  menuList: {
    '& > li': {
      padding: theme.spacing(1, 2),

      '&:active': {
        transform: 'none',
      },
      '&:hover': {
        backgroundColor: 'inherit',
        color: theme.palette.primary.main,
      },
    },
  },
}));
