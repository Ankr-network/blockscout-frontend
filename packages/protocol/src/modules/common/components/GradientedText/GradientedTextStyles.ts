import { makeStyles } from 'tss-react/mui';

import { enterpriseColor } from 'uiKit/Theme/themeUtils';

export const useGradientedTextStyles = makeStyles<string | undefined>()(
  (_theme, gradient = enterpriseColor) => ({
    root: {
      background: gradient,

      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  }),
);
