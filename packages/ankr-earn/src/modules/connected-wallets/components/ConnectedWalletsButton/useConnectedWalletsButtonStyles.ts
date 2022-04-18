import { alpha, makeStyles } from '@material-ui/core';

export const useConnectedWalletsButtonStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instanceText: {
    margin: theme.spacing(0, 1),
  },
  arrowIcon: {
    fontSize: 14,
  },
  btn: {
    height: 36,
    padding: theme.spacing(0, 1.75),
    fontWeight: 400,

    background: theme.palette.background.paper,
    color: theme.palette.text.primary,

    '&:hover': {
      background: alpha(theme.palette.background.paper, 0.4),
      color: theme.palette.text.primary,
    },
  },
  addWalletButton: {
    margin: theme.spacing(0, 0, 0, 1.5),

    '& > button': {
      width: 36,
      minWidth: 36,
      height: 36,
      margin: 0,
      backgroundColor: theme.palette.common.white,

      '&:hover': {
        backgroundColor: alpha(theme.palette.background.paper, 0.4),
      },
    },
    '& span > svg': {
      fontSize: 14,
    },
  },
  connectButton: {
    fontWeight: 600,
  },
}));
