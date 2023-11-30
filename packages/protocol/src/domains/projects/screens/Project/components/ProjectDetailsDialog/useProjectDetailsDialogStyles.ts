import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useProjectDetailsDialogStyles = makeStyles()(theme => ({
  formWrapper: {
    maxWidth: 520,
    display: 'flex',
    flexDirection: 'column',
  },
  formContent: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(8),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  label: {
    color: isLightTheme(theme)
      ? theme.palette.text.primary
      : theme.palette.common.white,
  },
  description: {
    '& > p': {
      textAlign: 'right',
      position: 'absolute',
      right: 12,
      bottom: 8,
    },
  },
  submitButton: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
}));
