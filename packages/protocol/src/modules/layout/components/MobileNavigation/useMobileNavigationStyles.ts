import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const MOBILE_NAVIGATION_HEIGHT = 80;

const MAX_WIDTH_FOR_BIG_FONT_SIZE = 400;

export const useMobileNavigationStyles = makeStyles<void, 'custom'>()(
  (theme: Theme, _params, classes) => ({
    root: {
      [`&.${classes.custom}`]: {
        display: 'none',
        alignItems: 'center',
        padding: theme.spacing(2 * 2, 0, 2 * 2.5),
        color: theme.palette.text.primary,
        position: 'fixed',
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        zIndex: 4,
        bottom: 0,

        '& svg:nth-of-type(1)': {
          display: 'block',
        },
        '& svg:nth-of-type(2)': {
          display: 'none',
        },
        [theme.breakpoints.down('sm')]: {
          display: 'flex',
        },
      },
    },

    custom: {},

    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(0, 2 * 1),
    },
    link: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: 14,
      padding: 0,
      color: theme.palette.grey[500],

      [theme.breakpoints.down(MAX_WIDTH_FOR_BIG_FONT_SIZE)]: {
        fontSize: 12,
      },

      '&:hover': {
        color: theme.palette.primary.main,
        background: theme.palette.background.paper,
        boxShadow: 'none',
      },

      '& svg': {
        marginBottom: theme.spacing(2 * 0.75),
      },
    },

    activeLink: {
      '&&': {
        color: theme.palette.primary.main,
        cursor: 'default',
        fontWeight: 'bold',
        '& svg': {
          strokeWidth: 2,
        },
        '&& svg:nth-of-type(1)': {
          display: 'none',
        },
        '&& svg:nth-of-type(2)': {
          display: 'block',
        },
      },
    },
  }),
);
