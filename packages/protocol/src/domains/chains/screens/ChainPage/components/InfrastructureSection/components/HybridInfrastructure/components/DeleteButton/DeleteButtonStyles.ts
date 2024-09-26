import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<void, 'icon'>()(
  (theme: Theme, _params, classes) => ({
    root: {
      display: 'flex',
      alignItems: 'flex-start',
    },

    link: {
      padding: 0,
      height: 44,

      '&:hover ': {
        background: theme.palette.background.default,

        [`& .${classes.icon}`]: {
          fill: theme.palette.primary.main,
        },
      },
    },
    icon: {
      width: 18,
      transition: '0.2s all',
      fill: theme.palette.grey[400],
    },
  }),
);
