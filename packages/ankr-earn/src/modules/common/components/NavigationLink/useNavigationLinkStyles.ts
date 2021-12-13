import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  link: {
    padding: theme.spacing(0, 2),
    color: theme.palette.text.secondary,
    background: 'none',
    fontWeight: 400,
    transition: 'color 0.2s',
    '&:hover': {
      color: theme.palette.primary.main,
      background: 'none',
    },
  },
  activeLink: {
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
}));
