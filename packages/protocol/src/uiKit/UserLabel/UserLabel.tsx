import { Briefcase } from '@ankr.com/ui';
import { Skeleton, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { EChargingModel } from 'modules/payments/types';
import { PromoBadge } from 'modules/common/components/PromoBadge';

import { getLabel } from './UserLabelUtils';
import { useUserLabelStyles } from './useUserLabelStyles';

export interface IUserLabelProps {
  chargingModel?: EChargingModel;
  className?: string;
  hasEnterpriseStatus?: boolean;
  hasPremium?: boolean;
  hasStatusTransition?: boolean;
  isLoading?: boolean;
  isPromo?: boolean;
  size: 'small' | 'medium' | 'large';
}

export const UserLabel = ({
  chargingModel,
  className: nestedClassName,
  hasEnterpriseStatus = false,
  hasPremium = false,
  hasStatusTransition = false,
  isLoading,
  isPromo,
  size = 'medium',
}: IUserLabelProps) => {
  const { classes, cx } = useUserLabelStyles();

  const hasPremiumLabel = hasStatusTransition ? !hasPremium : hasPremium;

  const className = cx(
    classes.root,
    {
      [classes.premium]: hasPremium,
      [classes.freemium]: !hasPremium,
      [classes.transition]: hasStatusTransition,
      [classes.enterprise]: hasEnterpriseStatus,
      [classes.package]: chargingModel === EChargingModel.Package,
      [classes.deal]: chargingModel === EChargingModel.Deal,
      [classes.small]: size === 'small',
      [classes.large]: size === 'large',
    },
    nestedClassName,
  );

  const label = useMemo(
    () => getLabel(hasPremiumLabel, chargingModel),
    [hasPremiumLabel, chargingModel],
  );

  if (isLoading) {
    return (
      <Skeleton
        className={cx(classes.root, classes.skeleton, nestedClassName)}
        variant="rectangular"
        width={70}
        height={24}
      />
    );
  }

  if (isPromo) {
    return <PromoBadge className={nestedClassName} />;
  }

  const isSmall = size === 'small';

  return (
    <Typography className={className} variant={isSmall ? 'body4' : 'body2'}>
      {hasEnterpriseStatus ? (
        <>
          <Briefcase fontSize="small" className={classes.enterpriseIcon} />
          {t('chains.user-enterprise')}
        </>
      ) : (
        label
      )}
    </Typography>
  );
};
