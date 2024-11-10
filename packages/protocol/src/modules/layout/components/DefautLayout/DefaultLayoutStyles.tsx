import { makeStyles } from 'tss-react/mui';

import { isLightTheme, premiumBackground } from 'uiKit/Theme/themeUtils';

import { HEADER_HEIGHT } from '../Header';
import { MOBILE_HEADER_HEIGHT } from '../MobileHeader';
import { SIDEBAR_WIDTH } from '../SideBar';

export const TOP_PADDING = 20;

export interface IUseDefaultLayoutStylesProps {
  bannerHeight: number;
  hasBreadcrumbs?: boolean;
  hasGradient?: boolean;
}

const name = 'DefaultLayout';

export const useDefaultLayoutStyles = makeStyles<IUseDefaultLayoutStylesProps>({
  name,
})((theme, { bannerHeight, hasBreadcrumbs = true, hasGradient }) => ({
  root: {
    display: 'flex',

    minWidth: 375,
    marginTop: bannerHeight,

    background: theme.palette.background.default,

    fontVariantNumeric: 'tabular-nums',
  },
  gradient: {
    background: 'none',
  },
  body: {
    display: 'flex',

    flexDirection: 'column',
    flexGrow: 1,

    width: '100%',
    minHeight: '100vh',
    paddingLeft: SIDEBAR_WIDTH,

    background:
      hasGradient && isLightTheme(theme)
        ? premiumBackground
        : theme.palette.background.default,

    [theme.breakpoints.down('md')]: {
      paddingLeft: 0,
    },
  },
  main: {
    flexGrow: 1,
    position: 'relative',
    paddingTop: HEADER_HEIGHT + TOP_PADDING,
    paddingBottom: 2 * TOP_PADDING,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),

    [theme.breakpoints.down('md')]: {
      paddingTop: MOBILE_HEADER_HEIGHT + TOP_PADDING,
    },
  },
  dashboardMain: {
    paddingTop: theme.spacing(21),

    [theme.breakpoints.down('md')]: {
      paddingTop: MOBILE_HEADER_HEIGHT + TOP_PADDING,
    },
  },
  header: {
    '&&': {
      backgroundColor: `${theme.palette.background.default} !important`,
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
  },
  dashboardHeader: {
    '&&': {
      paddingBottom: theme.spacing(4),
    },
  },
  mobileHeader: {
    display: 'none',

    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  sidebar: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  mobileBreadcrumbs: {
    display: hasBreadcrumbs ? 'block' : 'none',

    marginBottom: theme.spacing(5),
    paddingLeft: 2,

    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  content: {
    height: '100%',
  },
}));
