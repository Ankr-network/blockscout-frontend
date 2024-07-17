import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useChainLogoStyles = makeStyles<number | undefined>()(
  (theme, size?: number) => {
    const logoSize = size || 48;

    return {
      chainLogo: {
        width: logoSize,
        height: logoSize,
        backgroundColor: isLightTheme(theme)
          ? theme.palette.background.default
          : theme.palette.common.white,
        borderRadius: '50%',
      },
    };
  },
);
