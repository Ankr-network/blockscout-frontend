import { makeStyles } from '@material-ui/core';

export const useNavLinkStyles = makeStyles(theme => ({
  inlineTextVariant: {
    color: theme.palette.text.secondary,
    height: 'auto',
    padding: 0,
    fontWeight: 400,
    fontSize: 'inherit',
    minWidth: 0,

    transition: 'color 0.2s',
  },

  colorPrimary: {
    color: theme.palette.primary.main,
  },

  colorSecondary: {
    color: theme.palette.text.secondary,

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));
