import { makeStyles, Theme } from '@material-ui/core';
import { IGlobalMenuPopoverPosition } from './GlobalMenuUtils';

export const useStyles = makeStyles<Theme, IGlobalMenuPopoverPosition>(
  theme => ({
    mobileRoot: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      height: 56,

      padding: theme.spacing(0, 3.7),

      '& > div': {
        display: 'flex',
        alignItems: 'center',
      },
    },

    paper: {
      '&&': {
        overflow: 'hidden',
      },
    },

    popover: {
      '&&': {
        height: 670,
        maxHeight: ({ top }) => `calc(100vh - ${top}px - 30px)`,
      },
    },

    button: {
      '&&': {
        color: theme.palette.grey[600],
        border: 'none',
        '&:hover': {
          color: theme.palette.primary.main,
          backgroundColor: 'transparent',
        },
      },
    },

    buttonActive: {
      '&&': {
        color: theme.palette.primary.main,
      },
    },
  }),
);
