import { darken, lighten, makeStyles } from '@material-ui/core';

export const useMenuStyles = makeStyles(theme => ({
  menuIcon: {
    backgroundColor: theme.palette.common.white,
    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: 6,
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    transition: '0.2s all',

    marginTop: -3,
    padding: 0,
    position: 'relative',
    height: 32,
    width: 32,

    '&:hover': {
      borderColor: theme.palette.background.default,
      color: theme.palette.primary.main,
    },
  },

  menuPaper: {
    borderRadius: 12,
    boxShadow: `0px 2px 10px ${lighten(theme.palette.text.secondary, 0.6)}`,
  },

  menuList: {
    minWidth: 180,
    padding: theme.spacing(0.5, 0),
  },

  menuItem: {
    color: theme.palette.text.primary,
    fontSize: 16,
    padding: theme.spacing(1.5, 2),

    '&:first-child': {
      paddingTop: theme.spacing(2),
    },

    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },

  divider: {
    backgroundColor: darken(theme.palette.background.default, 0.1),

    margin: 'auto',
    height: 1,
    width: `calc(100% - ${theme.spacing(4)}px)`,
  },
}));
