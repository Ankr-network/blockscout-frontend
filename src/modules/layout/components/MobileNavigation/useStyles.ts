import { makeStyles, Theme } from '@material-ui/core';

export const HEADER_HEIGHT = 121;

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 0, 3.5),
    color: theme.palette.text.primary,
    position: 'fixed',
    width: '100%',
    backgroundColor: theme.palette.background.default,
    zIndex: 1,
    bottom: 0,
    boxShadow:
      '0px 0px 25px rgba(31, 34, 38, 0.05), 0px 5px 100px rgba(31, 34, 38, 0.05)',
  },

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
    padding: theme.spacing(2),
    fontWeight: 500,

    '&& svg': {
      fontSize: 16,
    },

    '&:hover': {
      background: theme.palette.background.default,
    },
  },

  activeLink: {
    color: theme.palette.text.primary,
    cursor: 'default',
    fontWeight: 'bold',
  },
}));
