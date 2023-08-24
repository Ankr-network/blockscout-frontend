import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useAddAndEditProjectFormStyles = makeStyles()(theme => ({
  formWrapper: {
    width: 520,
  },
  inputWrapper: {
    marginBottom: theme.spacing(5),
  },
  label: {
    color: isLightTheme(theme)
      ? theme.palette.text.primary
      : theme.palette.common.white,
  },
  submitButton: {
    marginBottom: theme.spacing(3),
  },
}));
