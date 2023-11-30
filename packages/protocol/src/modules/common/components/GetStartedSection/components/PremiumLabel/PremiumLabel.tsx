import { t } from '@ankr.com/common';

import { root } from '../../const';
import { usePremiumLabelStyles } from './PremiumLabelStyles';

export interface PremiumLabelProps {
  size?: 's' | 'm' | 'l';
  label?: string;
  className?: string;
}

export const PremiumLabel = ({
  size = 's',
  className,
  label,
}: PremiumLabelProps) => {
  const { classes, cx } = usePremiumLabelStyles(size);

  return (
    <div className={cx(classes.premiumLabel, className)}>
      <span className={classes.gradient}>
        {label || t(`${root}.endpoints.premium-label`)}
      </span>
    </div>
  );
};
