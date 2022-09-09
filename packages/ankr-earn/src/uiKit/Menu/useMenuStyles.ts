import { darken, lighten, makeStyles } from '@material-ui/core';

export const useMenuStyles = makeStyles(theme => ({
  menuIcon: {
    backgroundColor: theme.palette.common.white,
    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: 16,
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    transition: '0.2s all',

    padding: 0,
    position: 'relative',
    height: 44,
    width: 44,

    '&:hover': {
      backgroundColor: theme.palette.background.default,
      borderColor: theme.palette.background.default,
      color: theme.palette.text.primary,
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
    fontSize: 13,
    padding: theme.spacing(1.5, 2),

    '&:after': {
      content: `''`,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,

      display: 'block',
      height: 1,
      width: `calc(100% - ${theme.spacing(4)}px)`,
      margin: 'auto',

      backgroundColor: darken(theme.palette.background.default, 0.1),
    },

    '&:first-child': {
      paddingTop: theme.spacing(2),
    },

    '&:last-child': {
      paddingBottom: theme.spacing(2),

      '&:after': {
        display: 'none',
      },
    },
  },
}));
