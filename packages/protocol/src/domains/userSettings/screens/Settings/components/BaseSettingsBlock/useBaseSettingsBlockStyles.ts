import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useBaseSettingsBlockStyles = makeStyles()(theme => ({
  root: {
    marginBottom: theme.spacing(8),

    '&:last-of-type': {
      marginBottom: 0,
    },
  },
  title: {
    marginBottom: theme.spacing(8),
    color: isLightTheme(theme) ?
      theme.palette.text.primary
      : theme.palette.common.white,
  },
  content: {
    borderRadius: 20,
    padding: theme.spacing(8),
  },
}));
