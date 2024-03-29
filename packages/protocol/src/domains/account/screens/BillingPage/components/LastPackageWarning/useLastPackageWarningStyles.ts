import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useLastPackageWarningStyles = makeStyles()(theme => ({
  expiredNoticeWrapper: {
    backgroundColor: isLightTheme(theme)
      ? theme.palette.warning.light
      : theme.palette.warning.dark,
    borderRadius: theme.spacing(4),
    padding: theme.spacing(3, 4),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  warningIcon: {
    marginRight: theme.spacing(2),
    color: isLightTheme(theme)
      ? theme.palette.warning.main
      : theme.palette.warning.light,
  },
  expiredNotice: {
    marginRight: theme.spacing(4),
    color: isLightTheme(theme)
      ? theme.palette.text.primary
      : theme.palette.grey[100],
  },
  btn: {
    flexShrink: 0,
  },
}));
