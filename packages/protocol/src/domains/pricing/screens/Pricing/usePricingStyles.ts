import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { TOP_PADDING } from 'modules/layout/components/DefautLayout/DefaultLayoutStyles';
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
        marginTop: -(MOBILE_HEADER_HEIGHT + TOP_PADDING),
      },
    },
    content: {
      paddingTop: theme.spacing(32),
      maxWidth: 1100,
      margin: '0 auto',

      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(32, 1.5, 0, 1.5),
      },

      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(18, 4, 0, 4),
        background: isLightTheme
          ? premiumBackground
          : theme.palette.background.default,
      },
    },
    title: {
      textAlign: 'center',
      marginBottom: theme.spacing(10),
      color: theme.palette.text.primary,

      [theme.breakpoints.down('md')]: {
        fontSize: 42,
        marginBottom: theme.spacing(8),
      },
    },
  }),
);
