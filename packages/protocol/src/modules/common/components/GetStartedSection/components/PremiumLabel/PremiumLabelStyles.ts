import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { getPremiumColorGradient } from 'uiKit/Theme/themeUtils';

import { FontSize, getFontSize } from './premiumLabelUtils';

interface IUserPremiumLabelStylesProps {
  size: FontSize;
  hasGradientBackground?: boolean;
}

export const usePremiumLabelStyles = makeStyles<IUserPremiumLabelStylesProps>()(
  (theme: Theme, { hasGradientBackground, size }) => ({
    premiumLabel: {
      padding: size === 's' ? theme.spacing(0.5, 1) : 0,
      borderRadius: theme.spacing(2),
      background: hasGradientBackground
        ? getPremiumColorGradient(theme)
        : 'transparent',
    },
    gradient: {
      color: hasGradientBackground ? 'white' : getPremiumColorGradient(theme),
      background: hasGradientBackground
        ? 'transparent'
        : getPremiumColorGradient(theme),
      WebkitBackgroundClip: hasGradientBackground ? 'unset' : 'text',
      WebkitTextFillColor: hasGradientBackground ? 'unset' : 'transparent',
      letterSpacing: '0.01em',
      fontWeight: size === 's' || size === 'xs' ? 500 : 700,
      fontSize: getFontSize(size, theme),
      lineHeight: 1,
      padding: theme.spacing(1, 1.5),
    },
  }),
);
