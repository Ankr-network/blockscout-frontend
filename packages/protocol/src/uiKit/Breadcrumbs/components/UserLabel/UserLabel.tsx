import { useMemo } from 'react';
import { Briefcase } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { getLabel } from './UserLabelUtils';
import { useUserLabelStyles } from './useUserLabelStyles';

export interface IUserLabelProps {
  hasPremium?: boolean;
  hasStatusTransition?: boolean;
  className?: string;
  hasEnterpriseStatus?: boolean;
}

export const UserLabel = ({
  hasPremium = false,
  hasStatusTransition = false,
  className: nestedClassName,
  hasEnterpriseStatus = false,
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
    },
    nestedClassName,
  );

  const label = useMemo(() => getLabel(hasPremiumLabel), [hasPremiumLabel]);

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
