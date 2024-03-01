import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<boolean>()(
  (theme: Theme, canDownload: boolean) => ({
    transaction: {
      whiteSpace: 'nowrap',

      cursor: canDownload ? 'pointer' : 'default',

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

      fontSize: theme.spacing(2 * 1),
    },
  }),
);
