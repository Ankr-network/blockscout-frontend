import { makeStyles } from 'tss-react/mui';

import {
  getPremiumColorGradient,
  getPremiumColorGradientHover,
  isLightTheme,
} from 'uiKit/Theme/themeUtils';

export interface RoutePlaceholderStylesProps {
  bgLg: string;
  bgLgDark: string;
  bgSm: string;
  bgSmDark: string;
}

export const useRoutePlaceholderStyles =
  makeStyles<RoutePlaceholderStylesProps>()(
    (theme, { bgLg, bgLgDark, bgSm, bgSmDark }) => ({
      root: {
        height: '100%',
        backgroundImage: `url(${isLightTheme(theme) ? bgLg : bgLgDark})`,
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',

        [theme.breakpoints.down('xl')]: {
          backgroundImage: `url(${isLightTheme(theme) ? bgSm : bgSmDark})`,
        },
      },
      placeholder: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 'auto',
        maxWidth: 360,
      },
      img: {
        maxWidth: 218,
      },
      title: {
        marginBottom: theme.spacing(5),

        color: theme.palette.text.primary,
      },
      textPremium: {
        background: getPremiumColorGradient(theme),
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        WebkitBoxDecorationBreak: 'clone',
      },
      button: {
        borderRadius: 17,
        backgroundImage: getPremiumColorGradient(theme),
        position: 'relative',
        zIndex: 1,

        /* transition for gradient hack */
        '&:before': {
          borderRadius: 'inherit',
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: getPremiumColorGradientHover(theme),
          opacity: 0,
          transition: 'opacity 0.3s',
          zIndex: -1,
        },

        '&:hover': {
          '&:before': {
            opacity: 1,
          },
        },
      },
    }),
  );
