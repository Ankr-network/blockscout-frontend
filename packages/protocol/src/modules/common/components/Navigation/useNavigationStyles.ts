import { makeStyles, Theme } from '@material-ui/core';

export const HEADER_HEIGHT_XS = 66;
export const HEADER_HEIGHT_XL = 80;

export const useNavigationStyles = makeStyles<Theme>(theme => ({
  link: {
    width: '100%',
    height: 48,
    color: theme.palette.text.secondary,
    justifyContent: 'flex-start',
    padding: theme.spacing(1.5),
    fontWeight: 400,
    cursor: 'pointer',

    '&& svg': {
      [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(1),
      },
    },

    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.background.default,
      '& svg': {
        color: theme.palette.primary.main,
      },
    },

    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      color: theme.palette.text.primary,

      '&:after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        background: theme.palette.background.default,
        height: 2,
        bottom: 0,
        left: 45,
        width: 'calc(90% - 45px)',
      },
    },
  },
  activeLink: {
    color: theme.palette.primary.main,
    cursor: 'default',
    fontWeight: 600,
    background: theme.palette.background.default,
  },
  endIcon: {
    color: theme.palette.primary.main,
  },
  item: {
    width: '100%',
    height: 48,
    padding: theme.spacing(1.5),
  },
  skeleton: {
    height: theme.spacing(3),
    borderRadius: theme.spacing(0.75),
    backgroundColor: theme.palette.background.default,
  },
}));
