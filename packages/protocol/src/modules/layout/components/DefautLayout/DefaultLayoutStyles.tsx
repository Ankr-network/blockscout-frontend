import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { HEADER_HEIGHT } from '../Header';
import { MOBILE_HEADER_HEIGHT } from '../MobileHeader';
import { MOBILE_NAVIGATION_HEIGHT } from '../MobileNavigation';
import { SIDEBAR_WIDTH } from '../SideBar';
import { premiumBackground } from 'uiKit/Theme/themeUtils';

export const MOBILE_LAYOUT_PADDING = 30;

interface Props {
  hasGradient?: boolean;
  hasPaddingBottom?: boolean;
  isLightTheme: boolean;
}

export const useStyles = makeStyles<Props>()(
  (theme: Theme, { hasGradient, hasPaddingBottom, isLightTheme }: Props) => ({
    root: {
      display: 'flex',
      minWidth: 375,
      background: theme.palette.background.default,
      fontVariantNumeric: 'tabular-nums',
    },
    darkTheme: {},
    gradient: {
      background: 'none',
    },
    body: {
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      background:
        hasGradient && isLightTheme
          ? premiumBackground
          : theme.palette.background.default,

      paddingLeft: SIDEBAR_WIDTH,

      [theme.breakpoints.down('sm')]: {
        paddingLeft: 0,
      },
    },
    main: {
      flexGrow: 1,
      paddingBottom: hasPaddingBottom ? theme.spacing(2 * 6) : 0,
      position: 'relative',
      paddingTop: HEADER_HEIGHT,

      [theme.breakpoints.down('sm')]: {
        paddingTop: MOBILE_HEADER_HEIGHT + MOBILE_LAYOUT_PADDING,
        paddingBottom: 48 + MOBILE_NAVIGATION_HEIGHT,
      },
    },
    header: {
      '&&': {
        backgroundColor: `${theme.palette.background.default} !important`,
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
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
      marginBottom: theme.spacing(2 * 2.5),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  }),
);
