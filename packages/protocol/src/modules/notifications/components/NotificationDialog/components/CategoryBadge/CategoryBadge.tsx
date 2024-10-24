import { Chip } from '@mui/material';
import { ENotificationCategory } from 'multirpc-sdk';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { categoryBadgeTranslation } from './translation';
import { iconsMap } from './const';
import { useCategoryBadgeStyles } from './useCategoryBadgeStyles';

export interface ICategoryBadgeProps {
  category: ENotificationCategory;
}

export const CategoryBadge = ({ category }: ICategoryBadgeProps) => {
  const { classes } = useCategoryBadgeStyles(category);
  const { keys, t } = useTranslation(categoryBadgeTranslation);

  const isUnknownCategory = category === ENotificationCategory.UNKNOWN;

  if (isUnknownCategory) {
    return null;
  }

  const Icon = iconsMap[category];
  const label = t(keys[category]);

  return <Chip classes={classes} icon={<Icon />} label={label} size="small" />;
};
