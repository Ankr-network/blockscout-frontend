import { makeStyles, Theme } from '@material-ui/core/styles';

import { HEADER_HEIGHT } from '../Header';
import { MOBILE_HEADER_HEIGHT } from '../MobileHeader';
import { MOBILE_NAVIGATION_HEIGHT } from '../MobileNavigation';
import { SIDEBAR_WIDTH } from '../SideBar';

export const MOBILE_LAYOUT_PADDING = 30;

export const useStyles = makeStyles<
  Theme,
  { hasGradient?: boolean; hasPaddingBottom?: boolean }
>(theme => ({
  root: {
    display: 'flex',
    minWidth: 375,
    background: theme.palette.background.default,
    fontVariantNumeric: 'tabular-nums',
  },
  gradient: {
    background: 'none',
  },
  darkTheme: {},
  body: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    background: ({ hasGradient }) =>
      hasGradient
        ? `linear-gradient(180deg, rgba(242, 245, 250, 0) 0%, #F2F5FA 100%), linear-gradient(270deg, #D0DCF9 0%, #E3DCFA 50%, #F4E7DE 100%)`
        : theme.palette.background.default,

    paddingLeft: `${SIDEBAR_WIDTH}px`,

    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  main: {
    flexGrow: 1,
    paddingBottom: ({ hasPaddingBottom }) =>
      hasPaddingBottom ? theme.spacing(6) : 0,
    position: 'relative',
    paddingTop: `${HEADER_HEIGHT}px`,

    [theme.breakpoints.down('sm')]: {
      paddingTop: `${MOBILE_HEADER_HEIGHT + MOBILE_LAYOUT_PADDING}px`,
      paddingBottom: `${theme.spacing(6) + MOBILE_NAVIGATION_HEIGHT}px`,
    },
  },
  header: {
    backgroundColor: 'transparent',
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
