import { makeStyles } from 'tss-react/mui';

import {
  bannerGradientDark,
  bannerGradientLight,
  isLightTheme,
} from 'uiKit/Theme/themeUtils';

export const useBundlePaymentDialogStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
    maxWidth: 600,
    padding: 0,
  },
  closeButton: {
    top: 40,
    right: 40,

    border: `2px solid ${theme.palette.background.default}`,

    svg: {
      color: theme.palette.primary.main,
    },
  },
  dialogTitle: {
    marginBottom: theme.spacing(7.5),
    padding: theme.spacing(8, 0, 2),

    background: isLightTheme(theme) ? bannerGradientLight : bannerGradientDark,

    textAlign: 'center',
  },
  unlockIcon: {
    width: 240,
    height: 240,
  },
  content: {
    padding: theme.spacing(0, 10, 10),

    color: theme.palette.grey[900],
  },
  title: {
    marginBottom: theme.spacing(3),

    letterSpacing: '-0.03em',

    lineHeight: '110%',
  },
  description: {
    marginBottom: theme.spacing(5),

    letterSpacing: '-0.01em',

    lineHeight: '140%',
  },
  features: {
    listStyle: 'disc inside',
    listStylePosition: 'inside',

    margin: 0,
    marginBottom: theme.spacing(7.5),
    padding: 0,
  },
  feature: {
    display: 'list-item',

    padding: 0,

    letterSpacing: '-0.01em',

    fontSize: 16,
    lineHeight: '140%',

    span: {
      span: {
        color: theme.palette.grey[600],
      },
    },
  },
  button: {
    height: 48,

    backgroundColor: theme.palette.primary.main,
  },
}));
