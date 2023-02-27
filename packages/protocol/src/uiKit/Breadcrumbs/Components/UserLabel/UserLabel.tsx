import { t } from '@ankr.com/common';
import { useUserLabelStyles } from './useUserLabelStyles';

export interface IUserLabelProps {
  isPremium?: boolean;
}

export const UserLabel = ({ isPremium = false }: IUserLabelProps) => {
  const { classes, cx } = useUserLabelStyles();

  return (
    <div
      className={cx(classes.root, isPremium ? classes.premium : classes.free)}
    >
      {isPremium ? t('chains.user-premium') : t('chains.user-free')}
    </div>
  );
};
