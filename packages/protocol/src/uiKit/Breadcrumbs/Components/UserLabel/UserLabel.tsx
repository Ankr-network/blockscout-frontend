import { useMemo } from 'react';

import { Diamonds } from 'uiKit/Icons/Diamonds';

import { getLabel } from './UserLabelUtils';
import { useUserLabelStyles } from './useUserLabelStyles';

export interface IUserLabelProps {
  hasPremium?: boolean;
  isEnterpriseClient?: boolean;
  hasStatusTransition?: boolean;
}

export const UserLabel = ({
  hasPremium = false,
  isEnterpriseClient = false,
  hasStatusTransition = false,
}: IUserLabelProps) => {
  const { classes, cx } = useUserLabelStyles();

  const hasPremiumLabel = hasStatusTransition ? !hasPremium : hasPremium;

  const className = cx(classes.root, {
    [classes.premium]: hasPremium,
    [classes.free]: !hasPremium,
    [classes.transition]: hasStatusTransition,
    [classes.enterprise]: isEnterpriseClient,
  });

  const label = useMemo(
    () => getLabel(hasPremiumLabel, isEnterpriseClient),
    [hasPremiumLabel, isEnterpriseClient],
  );

  return (
    <div className={className}>
      {isEnterpriseClient && <Diamonds fontSize="small" color="secondary" />}
      {label}
    </div>
  );
};
