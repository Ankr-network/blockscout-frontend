import { makeStyles } from 'tss-react/mui';

import {
  bannerGradientDark,
  bannerGradientLight,
  isLightTheme,
} from 'uiKit/Theme/themeUtils';

export const useBundlePaymentBannerStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: theme.spacing(3.5, 4),

    borderRadius: 17,
    background:
      theme.palette.mode === 'light' ? bannerGradientLight : bannerGradientDark,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(4),
  },
  description: {
    display: 'flex',
    flexDirection: 'column',

    letterSpacing: '-0.01em',

    fontSize: 16,
    fontWeight: 700,
    lineHeight: '135%',
  },
  button: {
    backgroundColor: theme.palette.common.white,

    color: theme.palette.primary.main,

    letterSpacing: '-0.01em',

    fontSize: 16,
    fontWeight: 600,
    lineHeight: '150%',

    '&&': {
      boxShadow: 'none',
    },

    '&:hover': {
      backgroundColor: isLightTheme(theme)
        ? theme.palette.grey[100]
        : '#E7EBF3',

      color: theme.palette.primary.dark,
    },
  },
}));
