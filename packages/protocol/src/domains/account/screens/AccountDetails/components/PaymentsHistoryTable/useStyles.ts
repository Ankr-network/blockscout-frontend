import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  cellBold: {
    fontWeight: 600,
  },

  cellTopUp: {
    color: theme.palette.success.main,
  },

  transaction: {
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
}));
