import { makeStyles } from 'tss-react/mui';

export const useMenuButtonStyles = makeStyles()(theme => ({
  buttonMobile: {
    fontSize: 12,
    position: 'relative',
    width: 'auto',
    padding: theme.spacing(2.5, 3),

    border: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(3),

    color: theme.palette.text.primary,

    [theme.breakpoints.down('xs')]: {
      minWidth: 40,
    },
  },
  buttonDesktop: {
    position: 'relative',

    border: 'none',

    flexShrink: 0,

    width: 'auto',

    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    fontWeight: 500,
  },

  buttonDesktopWithMobileSidebar: {
    border: `2px solid ${theme.palette.grey[100]}`,
  },

  desktopContent: {
    display: 'none',
    color: theme.palette.primary.main,

    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },

  desktopContentWithMobileSidebar: {
    border: 'block',
  },
}));
