import { makeStyles } from '@material-ui/core';

export const useTestLinkStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    left: '50%',
    bottom: 0,
    transform: 'translateX(-50%)',
  },

  menuLink: {
    fontSize: '0.8rem',
    color: theme.palette.text.secondary,
  },
}));
