import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useProjectBannerStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: isLightTheme(theme)
      ? theme.palette.warning.light
      : theme.palette.warning.dark,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  iconWarning: {
    color: isLightTheme(theme)
      ? theme.palette.warning.main
      : theme.palette.warning.light,
  },
  message: {
    color: 'black',
  },
  closeButton: {
    color: 'black',
    border: 'none',
    marginLeft: 'auto',

    '&:hover': {
      backgroundColor: 'transparent',
      opacity: 0.8,
    },
  },
}));
