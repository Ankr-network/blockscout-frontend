import { makeStyles } from 'tss-react/mui';

import {
  bannerGradientDark,
  bannerGradientLight,
  isLightTheme,
} from 'uiKit/Theme/themeUtils';

export const useWelcomeDialogStyles = makeStyles()(theme => ({
  dialog: {
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
  content: {
    padding: theme.spacing(0, 10, 10),
  },
  icon: {
    width: 240,
    height: 240,
    margin: '0 auto',
  },
  title: {
    marginBottom: theme.spacing(7.5),
    padding: theme.spacing(8, 0, 2),

    background: isLightTheme(theme) ? bannerGradientLight : bannerGradientDark,

    textAlign: 'center',
  },
  close: {
    position: 'absolute',
    top: theme.spacing(10),
    right: theme.spacing(10),
  },
  message: {
    display: 'block',
    lineHeight: 1.4,
    letterSpacing: -0.16,

    '& p': {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(5),
    },
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: theme.palette.primary.main,
    padding: 0,
    minHeight: theme.spacing(5.5),
    height: theme.spacing(5.5),

    '& svg': {
      color: theme.palette.primary.main,
      width: theme.spacing(4),
    },

    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: 'transparent',

      '& svg': {
        color: theme.palette.text.primary,
      },
    },
  },
  configButton: {
    marginTop: theme.spacing(7.5),
    marginBottom: theme.spacing(3),
  },
}));
