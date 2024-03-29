import { useMemo } from 'react';
import { Briefcase } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { Skeleton, Typography } from '@mui/material';

import { EChargingModel } from 'modules/billing/types';

import { getLabel } from './UserLabelUtils';
import { useUserLabelStyles } from './useUserLabelStyles';

export interface IUserLabelProps {
  hasPremium?: boolean;
  hasStatusTransition?: boolean;
  chargingModel?: EChargingModel;
  className?: string;
  hasEnterpriseStatus?: boolean;
  isLoading?: boolean;
  size: 'small' | 'medium' | 'large';
}

export const UserLabel = ({
  hasPremium = false,
  hasStatusTransition = false,
  chargingModel,
  className: nestedClassName,
  hasEnterpriseStatus = false,
  isLoading,
  size = 'medium',
}: IUserLabelProps) => {
  const { classes, cx } = useUserLabelStyles();

  const hasPremiumLabel = hasStatusTransition ? !hasPremium : hasPremium;

  const className = cx(
    classes.root,
    {
      [classes.premium]: hasPremium,
      [classes.free]: !hasPremium,
      [classes.transition]: hasStatusTransition,
      [classes.enterprise]: hasEnterpriseStatus,
      [classes.package]: chargingModel === EChargingModel.Package,
      [classes.deal]: chargingModel === EChargingModel.Deal,
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
