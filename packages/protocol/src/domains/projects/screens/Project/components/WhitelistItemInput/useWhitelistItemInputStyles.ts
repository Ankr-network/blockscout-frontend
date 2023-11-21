import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useWhitelistItemInputStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  label: {
    color: isLightTheme(theme)
      ? theme.palette.text.primary
      : theme.palette.common.white,
  },
}));
