import { t } from '@ankr.com/common';

import { root } from '../../const';
import { usePremiumLabelStyles } from './PremiumLabelStyles';

export interface PremiumLabelProps {
  size?: 's' | 'm' | 'l';
  label?: string;
  className?: string;
}

const text = t(`${root}.endpoints.premium-label`);

export const PremiumLabel = ({
  size = 's',
  className,
  label = text,
}: PremiumLabelProps) => {
  const { classes, cx } = usePremiumLabelStyles(size);

  return (
    <div className={cx(classes.premiumLabel, className)}>
      <span className={classes.gradient}>{label}</span>
    </div>
  );
};
