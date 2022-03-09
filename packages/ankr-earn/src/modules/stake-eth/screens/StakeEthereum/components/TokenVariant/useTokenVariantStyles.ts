import { makeStyles } from '@material-ui/core';

export const useTokenVariantStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.secondary,
    fontWeight: 'normal',
  },

  active: {
    backgroundColor: theme.palette.background.default,
    cursor: 'default',
    color: theme.palette.text.primary,

    '&:active': {
      transform: 'none',
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));
