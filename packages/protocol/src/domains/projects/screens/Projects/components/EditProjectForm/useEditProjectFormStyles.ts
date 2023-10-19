import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useEditProjectFormStyles = makeStyles()(theme => ({
  root: {
    width: 520,
  },
  label: {
    color: isLightTheme(theme)
      ? theme.palette.text.primary
      : theme.palette.common.white,
  },
  submitButton: {
    marginBottom: theme.spacing(3),
  },
  description: {
    '& > p': {
      textAlign: 'right',
      position: 'absolute',
      right: 12,
      bottom: 8,
    },
  },
}));
