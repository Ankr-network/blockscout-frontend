import { makeStyles } from 'tss-react/mui';

import {
  getPremiumColorGradient,
  getPremiumColorGradientHover,
  isLightTheme,
} from 'uiKit/Theme/themeUtils';

import imgBg from './assets/bg-lg.png';
import imgBgDark from './assets/bg-lg-dark.png';
import imgBgSm from './assets/bg-sm.png';
import imgBgSmDark from './assets/bg-sm-dark.png';

export const useDashBoardPlaceholderStyles = makeStyles()(theme => ({
  /* placeholder styles */
  dashboardPlaceholder: {
    height: '100%',
    backgroundImage: isLightTheme(theme)
      ? `url(${imgBg})`
      : `url(${imgBgDark})`,
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top',

    [theme.breakpoints.down('xl')]: {
      backgroundImage: isLightTheme(theme)
        ? `url(${imgBgSm})`
        : `url(${imgBgSmDark})`,
    },
  },
  placeholderRoot: {
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
  placeholderTitle: {
    marginBottom: theme.spacing(5),
    '&&': {
      color: theme.palette.text.primary,
    },
  },
  textPremium: {
    background: getPremiumColorGradient(theme),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    WebkitBoxDecorationBreak: 'clone',
  },
  btn: {
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
}));
