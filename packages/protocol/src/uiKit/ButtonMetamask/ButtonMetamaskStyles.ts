import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useButtonMetamaskStyles = makeStyles<void, 'plusIconWrapper'>()(
  (theme: Theme, _params, classes) => ({
    button: {
      width: 38,
      minWidth: 38,

      position: 'relative',
      overflow: 'visible',
      border: `2px solid ${theme.palette.background.default}`,
      backgroundColor: theme.palette.background.default,

      '&:hover': {
        backgroundColor: theme.palette.background.default,
        [`& .${classes.plusIconWrapper}`]: {
          backgroundColor: theme.palette.primary.dark,
        },
      },

      '&:disabled': {
        opacity: 0.4,
        [`& .${classes.plusIconWrapper}`]: {
          backgroundColor: theme.palette.grey[600],
        },
      },
    },

    icon: {
      '&&': {
        fontSize: 24,
      },
    },

    plusIconWrapper: {
      position: 'absolute',
      backgroundColor: theme.palette.primary.main,
      padding: theme.spacing(2 * 0.5),
      borderRadius: '50%',
      lineHeight: 0,
      right: -13,
      bottom: -17,
      transition: 'background-color .3s',
    },
  }),
);
