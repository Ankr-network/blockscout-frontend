import { ENotificationCategory } from 'multirpc-sdk';
import { makeStyles } from 'tss-react/mui';

const name = 'CategoryBadge';

export const useCategoryBadgeStyles = makeStyles<ENotificationCategory>({
  name,
})((theme, category) => {
  const backgroundMap: Record<ENotificationCategory, string> = {
    [ENotificationCategory.BILLING]: theme.palette.background.default,
    [ENotificationCategory.NEWS]: theme.palette.teal.light,
    [ENotificationCategory.SYSTEM]: theme.palette.warning.light,
    [ENotificationCategory.UNKNOWN]: theme.palette.primary.light,
  };

  return {
    root: {
      height: 24,

      borderRadius: 8,

      backgroundColor: backgroundMap[category],

      '&&': {
        gap: theme.spacing(1),

        padding: theme.spacing(0.5, 2, 0.5, 1),
      },

      '&:hover': {
        backgroundColor: backgroundMap[category],
      },
    },
    icon: {
      '&&': {
        color: theme.palette.primary.main,
      },
    },
    label: {
      color: theme.palette.primary.main,
    },
  };
});
