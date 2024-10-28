import { useCallback } from 'react';
import { Typography } from '@mui/material';
import { BillingIcon, Chip, NewsIcon, SystemIcon } from '@ankr.com/ui';
import { ENotificationCategory } from 'multirpc-sdk';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { ENotificationsFilter } from 'modules/notifications/const';

import { AmountBadge } from '../AmountBadge';
import { filterTagTranslation } from './translation';
import { useFilterTagStyles } from './useFilterTagStyles';

interface IFilterTagProps {
  amount?: number;
  isActive: boolean;
  category: ENotificationsFilter;
  isTransparent?: boolean;
  shouldHideIcon?: boolean;
  shouldShowAmountInBraces?: boolean;
  handleChangeFilter: (filter: ENotificationsFilter) => void;
}

export const FilterTag = ({
  amount,
  category,
  handleChangeFilter,
  isActive,
  isTransparent = false,
  shouldHideIcon = false,
  shouldShowAmountInBraces = false,
}: IFilterTagProps) => {
  const { classes, cx } = useFilterTagStyles();
  const { keys, t } = useTranslation(filterTagTranslation);

  const filterItemIconMap: Partial<Record<ENotificationsFilter, JSX.Element>> =
    {
      [ENotificationCategory.BILLING]: (
        <BillingIcon
          className={cx(classes.icon, isActive && classes.activeTagIcon)}
        />
      ),
      [ENotificationCategory.NEWS]: (
        <NewsIcon
          className={cx(classes.icon, isActive && classes.activeTagIcon)}
        />
      ),
      [ENotificationCategory.SYSTEM]: (
        <SystemIcon
          className={cx(classes.icon, isActive && classes.activeTagIcon)}
        />
      ),
    };

  const onClick = useCallback(() => {
    handleChangeFilter(category);
  }, [handleChangeFilter, category]);

  const isAmountMoreThanZero = amount !== undefined && amount > 0;

  return (
    <Chip
      label={
        <div className={classes.root}>
          {!shouldHideIcon && filterItemIconMap[category]}
          <Typography variant="button3">
            {t(keys[category])}
            {isAmountMoreThanZero && shouldShowAmountInBraces && ` (${amount})`}
          </Typography>
          {isAmountMoreThanZero && !shouldShowAmountInBraces && (
            <AmountBadge amount={amount} className={classes.amountBadge} />
          )}
        </div>
      }
      color={isActive ? 'primary' : 'default'}
      onClick={onClick}
      className={cx(classes.generalBg, isTransparent && classes.transparentBg)}
    />
  );
};
