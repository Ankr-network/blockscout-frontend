import { Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { UserLabel } from 'uiKit/UserLabel';

import { usePlanLabelStyles } from './usePlanLabelStyles';
import { planLabelTranslation } from './planLabelTranslation';

export enum EPlanLabel {
  FREE = 'free',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise',
}

interface IPlanLabelProps {
  plan: EPlanLabel;
}

export const PlanLabel = ({ plan }: IPlanLabelProps) => {
  const { classes, cx } = usePlanLabelStyles();

  const { keys, t } = useTranslation(planLabelTranslation);

  switch (plan) {
    case EPlanLabel.FREE:
      return (
        <UserLabel
          hasPremium={false}
          hasEnterpriseStatus={false}
          hasStatusTransition={false}
          isLoading={false}
          size="small"
          className={classes.free}
        />
      );
    case EPlanLabel.ENTERPRISE:
      return (
        <div className={cx(classes.root, classes.enterprise)}>
          <Typography variant="body4">{t(keys.enterprise)}</Typography>
        </div>
      );
    default:
      return (
        <div className={cx(classes.root, classes.premiumLabel)}>
          <span className={classes.gradient}>
            <Typography variant="body4">{t(keys.premium)}</Typography>
          </span>
        </div>
      );
  }
};
