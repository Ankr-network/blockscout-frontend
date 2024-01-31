import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useInviteeRolePermissionsStyles = makeStyles()(theme => {
  const isLight = isLightTheme(theme);

  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2),

      padding: theme.spacing(4),

      borderRadius: 16,

      backgroundColor: theme.palette.primary.light,

      color: isLight
        ? theme.palette.grey[900]
        : theme.palette.background.default,
    },
    permissions: {
      ul: {
        margin: 0,
        padding: 0,
        paddingLeft: theme.spacing(3),
      },
      li: {
        whiteSpace: 'pre-wrap',
      },
    },
  };
});
