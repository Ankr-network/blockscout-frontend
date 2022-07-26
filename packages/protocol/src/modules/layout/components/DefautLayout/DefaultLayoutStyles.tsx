import { makeStyles, Theme } from '@material-ui/core/styles';

import { HEADER_HEIGHT } from '../Header';
import { MOBILE_HEADER_HEIGHT } from '../MobileHeader';
import { MOBILE_NAVIGATION_HEIGHT } from '../MobileNavigation';
import { SIDEBAR_WIDTH } from '../SideBar';

const MOBILE_LAYOUT_PADDING = 30;

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    minWidth: 375,
    background: theme.palette.background.paper,
    fontVariantNumeric: 'tabular-nums',
  },
  darkTheme: {},
  body: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    background: theme.palette.background.default,

    paddingLeft: `${SIDEBAR_WIDTH}px`,

    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  main: {
    flexGrow: 1,
    paddingBottom: theme.spacing(6),
    position: 'relative',
    paddingTop: `${HEADER_HEIGHT}px`,

    [theme.breakpoints.down('sm')]: {
      paddingTop: `${MOBILE_HEADER_HEIGHT + MOBILE_LAYOUT_PADDING}px`,
      paddingBottom: `${theme.spacing(6) + MOBILE_NAVIGATION_HEIGHT}px`,
    },
  },
  header: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mobileHeader: {
    display: 'none',

    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  sidebar: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mobileBreadcrumbs: {
    marginBottom: theme.spacing(2.5),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));
