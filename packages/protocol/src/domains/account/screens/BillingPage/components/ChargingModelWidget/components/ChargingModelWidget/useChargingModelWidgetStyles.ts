import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useChargingModelWidgetStyles = makeStyles()(theme => ({
  chargingModelWidgetRoot: {
    border: `2px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(2),
    borderRadius: theme.spacing(5),
    padding: theme.spacing(6, 8),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),

    '&:first-of-type': {
      marginTop: theme.spacing(8),
    },
  },
  currentModel: {
    position: 'relative',

    '&:before': {
      padding: theme.spacing(0.5, 1),
      content: '"Current"',
      position: 'absolute',
      color: isLightTheme(theme)
        ? theme.palette.success.main
        : theme.palette.success.contrastText,
      backgroundColor: isLightTheme(theme)
        ? theme.palette.success.light
        : theme.palette.success.dark,
      borderRadius: theme.spacing(2),
      fontSize: 12,
      top: -12,
      left: theme.spacing(8),
      fontWeight: 500,
    },
  },
  title: {
    // marginBottom: theme.spacing(3),
  },
}));
