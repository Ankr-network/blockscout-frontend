import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useAddProjectFormStyles = makeStyles()(theme => ({
  root: {
    width: 456,
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
