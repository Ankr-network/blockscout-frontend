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

      [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(1),
      },
    },

    '&:not($activeLink):hover': {
      background: theme.palette.background.paper,
    },
    '&:not(:last-child)': {
      marginBottom: 3,
    },

    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      color: theme.palette.text.primary,

      '&:after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        background: theme.palette.background.paper,
        height: 2,
        bottom: 0,
        left: 45,
        width: 'calc(90% - 45px)',
      },
    },
  },
  activeLink: {
    color: theme.palette.text.primary,
    cursor: 'default',
    fontWeight: 'bold',
    background: theme.palette.background.paper,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  endIcon: {
    color: theme.palette.primary.main,
  },
}));
