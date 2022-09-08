import { makeStyles } from '@material-ui/core';

export const useConnectedWalletsButtonStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  instanceText: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
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
      background: theme.palette.action.disabledBackground,
      color: theme.palette.text.primary,
    },
  },

  btnLabel: {
    display: 'grid',
    gridAutoColumns: 'auto',
    gridAutoFlow: 'column',
    gap: theme.spacing(0, 1),
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
        background: theme.palette.action.disabledBackground,
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
