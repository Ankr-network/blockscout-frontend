import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useLogInProviderIconStyles = makeStyles()(theme => ({
  icon: {
    height: 24,
    width: 24,
  },
  githubIcon: {
    color: isLightTheme(theme) ? 'unset' : theme.palette.common.white,
  },
}));
