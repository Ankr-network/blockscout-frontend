import { makeStyles, Theme } from '@material-ui/core';

export const MOBILE_NAVIGATION_HEIGHT = 80;

export const useMobileNavigationStyles = makeStyles<Theme>(theme => ({
  root: {
    '&$custom': {
      display: 'none',
      alignItems: 'center',
      padding: theme.spacing(2, 0, 2.5),
      color: theme.palette.text.primary,
      position: 'fixed',
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      zIndex: 4,
      bottom: 0,
      boxShadow:
        '0px 0px 25px rgba(31, 34, 38, 0.05), 0px 5px 100px rgba(31, 34, 38, 0.05)',

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
    padding: theme.spacing(0, 1),
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 10,

    '& svg': {
      marginBottom: 10,
    },
  },
  link: {
    color: theme.palette.text.secondary,
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
    fontWeight: 500,

    '&& svg': {
      fontSize: 16,
    },

    '&:hover': {
      background: theme.palette.background.paper,
    },
  },

  activeLink: {
    color: theme.palette.text.primary,
    cursor: 'default',
    fontWeight: 'bold',
  },
}));
