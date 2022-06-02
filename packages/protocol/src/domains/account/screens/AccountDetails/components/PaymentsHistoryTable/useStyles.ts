import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  top: {
    width: '100%',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  title: {
    flexShrink: 0,
  },
  cellBold: {
    fontWeight: 600,
  },

  cellTopUp: {
    color: theme.palette.success.main,
  },

  transaction: {
    whiteSpace: 'nowrap',

    '&:hover $arrowIcon': {
      color: theme.palette.grey[500],
    },
  },

  cellDownload: {
    cursor: 'pointer',
  },

  arrowIcon: {
    color: theme.palette.grey[300],
    transition: 'color 0.2s',
    fontSize: 8,
    position: 'relative',
    top: -2,
    left: 2,
  },
  preloader: {
    height: theme.spacing(8.25),
  },
}));
