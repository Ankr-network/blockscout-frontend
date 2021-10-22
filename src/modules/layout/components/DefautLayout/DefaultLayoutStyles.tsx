import { makeStyles, Theme } from '@material-ui/core/styles';

import { mainTheme } from 'modules/themes/mainTheme';
import { SIDEBAR_WIDTH } from '../SideBar';
import { HEADER_HEIGHT } from '../Header';
import { MOBILE_HEADER_HEIGHT } from '../MobileHeader';
import { MOBILE_NAVIGATION_HEIGHT } from '../MobileNavigation';

const MOBILE_LAYOUT_PADDING = 30;

interface StyleProps {
  isLayoutDefaultColor: boolean;
}

export const useStyles = makeStyles<Theme, StyleProps>(theme => ({
  root: {
    display: 'flex',
    minWidth: 375,
    background: theme.palette.background.default,
  },
  darkTheme: {},
  body: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    background: props =>
      props.isLayoutDefaultColor
        ? mainTheme.palette.background.default
        : mainTheme.palette.background.paper,

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
    display: 'none',
    marginBottom: theme.spacing(2.5),
  },
}));
