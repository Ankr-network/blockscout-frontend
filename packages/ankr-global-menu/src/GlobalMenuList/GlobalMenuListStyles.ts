import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme, { isMobile?: boolean }>(theme => ({
  menu: {
    fontFamily: 'Inter, Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',

    width: ({ isMobile }) => (isMobile ? 345 : 360),
    height: '100%',
    padding: ({ isMobile }) => theme.spacing(isMobile ? 2.2 : 3.8, 0, 0),

    '& a': {
      textDecoration: 'none',
      color: theme.palette.text.primary,

      '&:visited': {
        color: 'inherit',
      },

      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
  },
  menuList: {
    marginTop: ({ isMobile }) => theme.spacing(isMobile ? 5 : 6.1),
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
  icon: {
    fontSize: 0,
    marginRight: theme.spacing(2),

    '& > svg': {
      fontSize: 30,
    },
  },
  menuTitleLink: {
    '&&': {
      display: 'flex',
      alignItems: 'center',
      lineHeight: 1,
      justifyContent: 'flex-start',
      color: theme.palette.text.primary,
      fontSize: ({ isMobile }) => (isMobile ? 20 : 24),
      fontWeight: 500,
      background: 'none',
      padding: theme.spacing(0, 3),
      '& svg': {
        fontSize: 16,
        marginLeft: theme.spacing(1),
      },
    },
  },
  menuItem: {
    display: 'flex',

    padding: ({ isMobile }) => theme.spacing(isMobile ? 2 : 3, 3),

    '&:not(:last-child)': {
      marginBottom: ({ isMobile }) => theme.spacing(isMobile ? 2 : 3),
    },
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
    fontSize: ({ isMobile }) => (isMobile ? 16 : 18),
  },
  menuItemGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    marginBottom: ({ isMobile }) => theme.spacing(isMobile ? 2 : 3.8),
  },
  menuItemTitle: {
    display: 'block',
    color: theme.palette.action.disabledBackground,
    fontSize: 14,
    fontWeight: 400,
    marginBottom: ({ isMobile }) => theme.spacing(isMobile ? 1 : 0.8),
    padding: theme.spacing(0, 3),
  },
}));
