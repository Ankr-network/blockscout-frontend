import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme, { isMobile?: boolean }>(theme => ({
  menu: {
    fontFamily: 'Inter, Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',

    width: ({ isMobile }) => (isMobile ? 350 : 250),
    height: '100%',
    padding: theme.spacing(3.5, 0, 0),

    '& a': {
      textDecoration: 'none',
      color: theme.palette.text.primary,

      '&:visited': {
        color: 'inherit',
      },

      '&:hover': {
        color: theme.palette.primary.main,

        '& $linkArrow': {
          color: theme.palette.primary.main,
        },
      },
    },
  },
  menuList: {
    marginTop: theme.spacing(3),
    height: '100%',
  },
  activeMenuItem: {
    '&&': {
      color: theme.palette.action.disabledBackground,
      cursor: 'default',
      '&:hover': {
        color: theme.palette.action.disabledBackground,
      },
    },
  },
  closeBtn: {
    '&&': {
      color: theme.palette.action.disabledBackground,
      fontSize: 32,
      alignSelf: 'flex-start',
      padding: 0,
      marginBottom: theme.spacing(3),
      marginLeft: theme.spacing(1.5),
      border: 'none',
    },
  },
  menuTitleLink: {
    '&&': {
      display: 'flex',
      alignItems: 'center',
      lineHeight: 1,
      justifyContent: 'flex-start',
      color: theme.palette.text.primary,
      fontSize: 16,
      fontWeight: 700,
      background: 'none',
      padding: theme.spacing(0, 3),
    },
  },
  menuItem: {
    display: 'flex',
    padding: theme.spacing(1, 3),
  },
  menuItemLeftBlock: {
    marginRight: theme.spacing(2),
  },
  menuItemRightBlock: {
    display: 'flex',
    alignItems: 'center',
  },
  menuItemLabel: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontWeight: 500,
    fontSize: 16,
  },
  linkArrow: {
    verticalAlign: 'middle',
    marginTop: -1,
    marginLeft: theme.spacing(1),
    transition: 'transform 0.15s',
    color: '#BFC6D0',
  },
  menuItemGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    marginBottom: theme.spacing(3),
  },
  menuItemTitle: {
    display: 'block',
    color: theme.palette.grey[600],
    fontSize: 14,
    fontWeight: 400,
    padding: theme.spacing(0, 3),
  },
}));
