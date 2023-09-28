import { useMemo } from 'react';
import { Briefcase } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';

import { getLabel } from './UserLabelUtils';
import { useUserLabelStyles } from './useUserLabelStyles';

export interface IUserLabelProps {
  hasPremium?: boolean;
  hasStatusTransition?: boolean;
}

export const UserLabel = ({
  hasPremium = false,
  hasStatusTransition = false,
}: IUserLabelProps) => {
  const { classes, cx } = useUserLabelStyles();

  const { isEnterpriseClient } = useEnterpriseClientStatus();

  const hasPremiumLabel = hasStatusTransition ? !hasPremium : hasPremium;

  const className = cx(classes.root, {
    [classes.premium]: hasPremium,
    [classes.free]: !hasPremium,
    [classes.transition]: hasStatusTransition,
    [classes.enterprise]: isEnterpriseClient,
  });

  const label = useMemo(() => getLabel(hasPremiumLabel), [hasPremiumLabel]);

  return (
    <div className={className}>
      {isEnterpriseClient ? (
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
