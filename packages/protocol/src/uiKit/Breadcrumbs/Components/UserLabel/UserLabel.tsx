import { t } from '@ankr.com/common';
import { useUserLabelStyles } from './useUserLabelStyles';

export interface IUserLabelProps {
  hasPremium?: boolean;
}

export const UserLabel = ({ hasPremium = false }: IUserLabelProps) => {
  const { classes, cx } = useUserLabelStyles();

  return (
    <div
      className={cx(classes.root, hasPremium ? classes.premium : classes.free)}
    >
      {hasPremium ? t('chains.user-premium') : t('chains.user-free')}
    </div>
  );
};
