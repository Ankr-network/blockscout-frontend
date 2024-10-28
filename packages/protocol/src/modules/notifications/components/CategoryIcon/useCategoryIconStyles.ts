import { ENotificationCategory } from 'multirpc-sdk';
import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useCategoryIconStyles = makeStyles<ENotificationCategory>({
  name: 'CategoryIcon',
})((theme, category) => {
  const backgroundMap: Record<ENotificationCategory, string> = {
    [ENotificationCategory.BILLING]: theme.palette.background.default,
    [ENotificationCategory.NEWS]: theme.palette.teal.light,
    [ENotificationCategory.SYSTEM]: theme.palette.warning.light,
    [ENotificationCategory.UNKNOWN]: theme.palette.primary.light,
  };

  const darkBackgroundMap: Record<ENotificationCategory, string> = {
    [ENotificationCategory.BILLING]: theme.palette.background.default,
    // unique color, there is no in our palette
    [ENotificationCategory.NEWS]: '#093333',
    // unique color, there is no in our palette
    [ENotificationCategory.SYSTEM]: '#554D42',
    [ENotificationCategory.UNKNOWN]: theme.palette.primary.light,
  };

  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      width: 40,
      minWidth: 40,
      borderRadius: '50%',
      position: 'relative',
      backgroundColor: isLightTheme(theme)
        ? backgroundMap[category]
        : darkBackgroundMap[category],
    },
    icon: {
      height: 20,
      width: 20,
      color: theme.palette.primary.main,
    },
    unreadDot: {
      height: 10,
      width: 10,
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
      border: `1.5px solid ${theme.palette.background.paper}`,
      position: 'absolute',
      top: 0,
      right: 0,
    },
  };
});
