import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useButtonMetamaskStyles = makeStyles<void, 'plusIconWrapper'>()(
  (theme: Theme, _params, classes) => ({
    button: {
      padding: theme.spacing(2 * 0.875),
      position: 'relative',
      overflow: 'visible',
      border: `2px solid ${theme.palette.background.default}`,
      backgroundColor: theme.palette.background.default,

      '&:hover': {
        backgroundColor: theme.palette.background.paper,
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
    size_large: {
      minWidth: 48,
      minHeight: 48,

      /* size for metamask fox icon */
      '& > span > svg': {
        width: '30px',
        height: '30px',
      },
    },
    size_medium: {
      minWidth: 42,
      minHeight: 42,
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
