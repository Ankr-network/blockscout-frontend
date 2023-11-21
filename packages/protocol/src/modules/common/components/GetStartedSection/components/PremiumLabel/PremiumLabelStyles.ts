import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { getPremiumColorGradient } from 'uiKit/Theme/themeUtils';

import { FontSize, getFontSize } from './premiumLabelUtils';

export const usePremiumLabelStyles = makeStyles<FontSize>()(
  (theme: Theme, size: FontSize) => ({
    premiumLabel: {
      padding: size === 's' ? theme.spacing(0.5, 1) : 0,
      borderRadius: theme.spacing(2),
      backgroundColor: 'transparent',
    },
    gradient: {
      background: getPremiumColorGradient(theme),
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '0.01em',
      fontWeight: size === 's' ? 400 : 700,
      fontSize: getFontSize(size, theme),
      lineHeight: theme.spacing(5),
    },
  }),
);
