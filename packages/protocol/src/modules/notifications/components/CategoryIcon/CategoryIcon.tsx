import { BillingIcon, NewsIcon, SystemIcon } from '@ankr.com/ui';
import { ENotificationCategory } from 'multirpc-sdk';

import { useCategoryIconStyles } from './useCategoryIconStyles';

interface ICategoryIconProps {
  category: ENotificationCategory;
  isUnread: boolean;
}

export const CategoryIcon = ({ category, isUnread }: ICategoryIconProps) => {
  const { classes } = useCategoryIconStyles(category);

  const filterIconMap: Partial<Record<ENotificationCategory, JSX.Element>> = {
    [ENotificationCategory.BILLING]: <BillingIcon className={classes.icon} />,
    [ENotificationCategory.NEWS]: <NewsIcon className={classes.icon} />,
    [ENotificationCategory.SYSTEM]: <SystemIcon className={classes.icon} />,
  };

  return (
    <div className={classes.root}>
      {filterIconMap[category]}
      {isUnread && <div className={classes.unreadDot} />}
    </div>
  );
};
