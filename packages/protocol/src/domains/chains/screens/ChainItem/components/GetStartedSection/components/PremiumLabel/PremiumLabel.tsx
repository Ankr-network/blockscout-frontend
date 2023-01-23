import { root } from '../../const';
import { t } from '@ankr.com/common';
import { usePremiumLabelStyles } from './PremiumLabelStyles';

export interface PremiumLabelProps {
  size?: 's' | 'm' | 'l';
  className?: string;
}

const label = t(`${root}.endpoints.premium-label`);

export const PremiumLabel = ({ size = 's', className }: PremiumLabelProps) => {
  const { classes, cx } = usePremiumLabelStyles(size);

  return (
    <div className={cx(classes.premiumLabel, className)}>
      <span className={classes.gradient}>{label}</span>
    </div>
  );
};
