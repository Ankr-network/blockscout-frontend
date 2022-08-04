import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme, boolean>(theme => ({
  transaction: {
    whiteSpace: 'nowrap',

    cursor: canDownload => (canDownload ? 'pointer' : 'default'),

    '&:hover $arrowIcon': {
      color: theme.palette.grey[500],
    },
  },

  arrowIcon: {
    position: 'relative',
    top: -2,
    left: 2,

    transition: 'color 0.2s',

    color: theme.palette.grey[300],

    fontSize: theme.spacing(1),
  },
}));
