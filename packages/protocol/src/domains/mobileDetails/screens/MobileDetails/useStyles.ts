import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<void, 'closeIcon'>()(
  (theme: Theme, _params, classes) => ({
    paper: {
      background: theme.palette.background.paper,
    },

    close: {
      [`&.${classes.closeIcon}`]: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 40,
        height: 40,
        padding: 0,
        color: theme.palette.text.primary,
        border: 'none',

        '&:hover': {
          border: 'none',
        },
      },
    },
    closeIcon: {},

    icon: {
      fontSize: 25,
    },
  }),
);
