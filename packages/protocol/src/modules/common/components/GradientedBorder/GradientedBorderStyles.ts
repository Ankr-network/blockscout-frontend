import { makeStyles } from 'tss-react/mui';

import { premiumColor } from 'uiKit/Theme/themeUtils';

export interface GradientedBorderStyles {
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  gradient?: string;
}

export const useGradientedBorderStyles = makeStyles<GradientedBorderStyles>()(
  (
    theme,
    {
      backgroundColor = theme.palette.common.white,
      borderRadius = 0,
      borderWidth = 1,
      gradient = premiumColor,
    },
  ) => ({
    root: {
      overflow: 'hidden',

      padding: borderWidth,

      borderRadius,

      background: gradient,
    },
    content: {
      overflow: 'hidden',

      backgroundColor,

      borderRadius: Math.floor(borderRadius - borderWidth / 2),
    },
  }),
);
