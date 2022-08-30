import { root } from '../../const';
import { t } from 'modules/i18n/utils/intl';
import { usePremiumLabelStyles } from './PremiumLabelStyles';

export interface EndpointsHeaderProps {
  isPremium?: boolean;
  title: string;
}

const label = t(`${root}.endpoints.premium-label`);

export const PremiumLabel = () => {
  const classes = usePremiumLabelStyles();

  return (
    <div className={classes.premiumLabel}>
      <span className={classes.gradient}>{label}</span>
    </div>
  );
};
