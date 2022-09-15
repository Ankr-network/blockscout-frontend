import { alpha, makeStyles } from '@material-ui/core';

export const useNetworkChooserStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyArea: {
    position: 'relative',
    width: 620,
    padding: theme.spacing(6.25, 6.25, 6.25, 6.25),
  },
  headerArea: {
    margin: theme.spacing(0, 7, 0, 7),
    textAlign: 'center',
  },
  chooseArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(8, 0, 5, 0),
  },
  chooseItemArea: {
    width: 176,
    height: 180,
    padding: theme.spacing(2.5, 2.5, 2.5, 2.5),
    color: theme.palette.text.primary,
    border: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
    borderRadius: 18,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: alpha(theme.palette.text.secondary, 0.2),
    },

    '& > span': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  chooseItemAreaSecond: {
    margin: theme.spacing(0, 0, 0, 5),
  },

  closeBtn: {
    position: 'absolute',
    top: theme.spacing(2.5),
    right: theme.spacing(2.5),
    width: theme.spacing(4),
    minWidth: 0,
    height: theme.spacing(4),
    padding: 0,
    color: theme.palette.text.secondary,
    borderRadius: '50%',

    [theme.breakpoints.up('md')]: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },

  chooseItemIcon: {
    size: 70,
  },
  chooseItemTitle: {
    margin: theme.spacing(2.5, 0, 0, 0),
    fontWeight: 700,
  },
  chooseItemBalance: {
    margin: theme.spacing(1, 0, 0, 0),
    fontWeight: 400,
  },
}));
