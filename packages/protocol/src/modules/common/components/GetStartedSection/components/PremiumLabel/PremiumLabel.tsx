import { t } from '@ankr.com/common';

import { root } from '../../const';
import { usePremiumLabelStyles } from './PremiumLabelStyles';
import { FontSize } from './premiumLabelUtils';

export interface PremiumLabelProps {
  size?: FontSize;
  label?: string;
  className?: string;
  hasGradientBackground?: boolean;
}

export const PremiumLabel = ({
  className,
  hasGradientBackground,
  label,
  size = 's',
}: PremiumLabelProps) => {
  const { classes, cx } = usePremiumLabelStyles({
    size,
    hasGradientBackground,
  });

  return (
    <div className={cx(classes.premiumLabel, className)}>
      <span className={classes.gradient}>
        {label || t(`${root}.endpoints.premium-label`)}
      </span>
    </div>
  );
};
