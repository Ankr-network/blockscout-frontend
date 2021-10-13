import { makeStyles, Theme } from '@material-ui/core';

export const HEADER_HEIGHT_XS = 66;
export const HEADER_HEIGHT_XL = 80;

export const useStyles = makeStyles<Theme>(theme => ({
  link: {
    width: '100%',
    color: theme.palette.text.secondary,
    justifyContent: 'flex-start',
    padding: theme.spacing(2),
    fontWeight: 500,

    '&& svg': {
      fontSize: 16,
      marginRight: theme.spacing(1.5),
    },

    '&:not($activeLink):hover': {
      background: theme.palette.background.paper,
    },
  },
  activeLink: {
    color: theme.palette.text.primary,
    cursor: 'default',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  endIcon: {
    color: theme.palette.primary.main,
  },
}));
