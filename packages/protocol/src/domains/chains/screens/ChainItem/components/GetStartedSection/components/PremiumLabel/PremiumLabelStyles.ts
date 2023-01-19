import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { FontSize, getFontSize } from './premiumLabelUtils';

export const usePremiumLabelStyles = makeStyles<FontSize>()(
  (theme: Theme, size: FontSize) => ({
    premiumLabel: {
      padding: size === 's' ? theme.spacing(2 * 0.25, 1) : 0,

      borderRadius: theme.spacing(2 * 1),

      backgroundColor: 'transparent',
    },
    gradient: {
      background:
        'linear-gradient(270.26deg, #013CD3 0.23%, #6235D0 26.13%, #AF34B1 49.87%, #E85658 76.96%, #FF7710 99.78%)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',

      letterSpacing: '0.01em',

      fontWeight: size === 's' ? 400 : 700,
      fontSize: getFontSize(size, theme),
      lineHeight: theme.spacing(2 * 2.5),
    },
  }),
);
