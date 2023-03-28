import { t } from '@ankr.com/common';
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

  const hasPremiumLabel = hasStatusTransition ? !hasPremium : hasPremium;

  const className = cx(classes.root, {
    [classes.premium]: hasPremium,
    [classes.free]: !hasPremium,
    [classes.transition]: hasStatusTransition,
  });

  return (
    <div className={className}>
      {hasPremiumLabel ? t('chains.user-premium') : t('chains.user-free')}
    </div>
  );
};
