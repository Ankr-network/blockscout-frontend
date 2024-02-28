import { useMemo } from 'react';
import { Briefcase } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { Skeleton } from '@mui/material';

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
}

export const UserLabel = ({
  hasPremium = false,
  hasStatusTransition = false,
  chargingModel,
  className: nestedClassName,
  hasEnterpriseStatus = false,
  isLoading,
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

  return (
    <div className={className}>
      {hasEnterpriseStatus ? (
        <>
          <Briefcase fontSize="small" className={classes.enterpriseIcon} />
          {t('chains.user-enterprise')}
        </>
      ) : (
        label
      )}
    </div>
  );
};
