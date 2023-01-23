import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { HEADER_HEIGHT } from '../Header';
import { MOBILE_HEADER_HEIGHT } from '../MobileHeader';
import { MOBILE_NAVIGATION_HEIGHT } from '../MobileNavigation';
import { SIDEBAR_WIDTH } from '../SideBar';

export const MOBILE_LAYOUT_PADDING = 30;

interface Props {
  hasGradient?: boolean;
  hasPaddingBottom?: boolean;
  isHeaderTransparent?: boolean;
}

export const useStyles = makeStyles<Props>()(
  (
    theme: Theme,
    { hasGradient, hasPaddingBottom, isHeaderTransparent }: Props,
  ) => ({
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
      background: hasGradient
        ? `linear-gradient(180deg, rgba(242, 245, 250, 0) 0%, #F2F5FA 100%), linear-gradient(270deg, #D0DCF9 0%, #E3DCFA 50%, #F4E7DE 100%)`
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
        backgroundColor:
          isHeaderTransparent || hasGradient
            ? 'transparent !important'
            : `${theme.palette.background.default} !important`,
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
