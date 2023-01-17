import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<void, 'plusIcon'>()(
  (theme: Theme, _params, classes) => ({
    button: {
      fontSize: 16,
      paddingRight: 0,
      background: 'transparent',
      height: 'auto',
      padding: 0,

      '&:hover': {
        background: 'transparent',

        [`& .${classes.plusIcon}`]: {
          fill: theme.palette.text.primary,
        },
      },

      [`&.Mui-disabled .${classes.plusIcon}`]: {
        fill: theme.palette.text.disabled,
      },
    },
    plusIcon: {
      width: 14,
      height: 14,
      fill: theme.palette.primary.main,
    },
  }),
);
