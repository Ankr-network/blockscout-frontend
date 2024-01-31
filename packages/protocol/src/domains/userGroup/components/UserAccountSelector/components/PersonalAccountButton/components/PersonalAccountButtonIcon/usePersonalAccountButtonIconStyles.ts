import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const usePersonalAccountButtonIconStyles = makeStyles()(theme => ({
  oauthIcon: {
    '&&': {
      color: isLightTheme(theme)
        ? theme.palette.common.black
        : theme.palette.common.white,
    },
  },
}));
