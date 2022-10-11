import classNames from 'classnames';

import { root } from '../../const';
import { t } from 'modules/i18n/utils/intl';
import { usePremiumLabelStyles } from './PremiumLabelStyles';

export interface PremiumLabelProps {
  size?: 's' | 'm' | 'l';
  className?: string;
}

const label = t(`${root}.endpoints.premium-label`);

export const PremiumLabel = ({ size = 's', className }: PremiumLabelProps) => {
  const classes = usePremiumLabelStyles({ size });

  return (
    <div className={classNames(classes.premiumLabel, className)}>
      <span className={classes.gradient}>{label}</span>
    </div>
  );
};
