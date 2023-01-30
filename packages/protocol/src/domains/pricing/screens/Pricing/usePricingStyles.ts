import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { MOBILE_LAYOUT_PADDING } from 'modules/layout/components/DefautLayout/DefaultLayoutStyles';
import { HEADER_HEIGHT } from 'modules/layout/components/Header';
import { MOBILE_HEADER_HEIGHT } from 'modules/layout/components/MobileHeader';
import { premiumBackground } from 'uiKit/Theme/themeUtils';

export const usePricingStyles = makeStyles<boolean>()(
  (theme: Theme, isLightTheme: boolean) => ({
    root: {
      marginTop: -HEADER_HEIGHT,
      height: '100%',
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        marginTop: -(MOBILE_HEADER_HEIGHT + MOBILE_LAYOUT_PADDING),
      },
    },
    content: {
      padding: theme.spacing(0, 2 * 2),
      [theme.breakpoints.down('sm')]: {
        background: isLightTheme
          ? premiumBackground
          : theme.palette.background.default,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: theme.spacing(2 * 15.5),
      padding: 0,
      '&&': {
        maxWidth: 1020,
        padding: 0,
      },

      [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(2 * 7.5),
      },
    },
    featureBlock: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      overflow: 'hidden',
      margin: theme.spacing(2 * -2.5, 0, 0, 2 * -2.5),
      '& > *': {
        margin: theme.spacing(2 * 2.5, 0, 0, 2 * 2.5),
      },
      [theme.breakpoints.down('md')]: {
        flexWrap: 'nowrap',
        overflowX: 'auto',
        justifyContent: 'flex-start',
        '& > *': {
          flexShrink: 0,
        },
      },
    },
    start: {
      paddingBottom: theme.spacing(2 * 6),
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '0 100%, 100% 100%',
      backgroundSize: 'auto 100%',
      [theme.breakpoints.between(768, 960)]: {
        backgroundSize: '40% auto',
      },
      [theme.breakpoints.down(768)]: {
        marginBottom: theme.spacing(2 * -6),
        paddingBottom: 0,
      },
    },
  }),
);
