import { makeStyles } from '@material-ui/core';

export const useRightsStyles = makeStyles(theme => ({
  root: {
    fontWeight: 400,
    whiteSpace: 'nowrap',
    fontSize: 14,
  },

  link: {
    '&&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));
