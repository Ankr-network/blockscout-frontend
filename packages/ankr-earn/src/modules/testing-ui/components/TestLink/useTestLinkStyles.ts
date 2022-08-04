import { makeStyles } from '@material-ui/core';
import zIndex from '@material-ui/core/styles/zIndex';

export const useTestLinkStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    zIndex: zIndex.modal,
    left: 0,
    bottom: 0,
    padding: theme.spacing(0.5, 1),

    background: theme.palette.common.white,
    fontSize: '0.8rem',
    color: theme.palette.text.secondary,

    [theme.breakpoints.up('md')]: {
      opacity: 0.75,
    },

    '&:hover': {
      [theme.breakpoints.up('md')]: {
        opacity: 1,
      },
    },
  },

  menuLink: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));
