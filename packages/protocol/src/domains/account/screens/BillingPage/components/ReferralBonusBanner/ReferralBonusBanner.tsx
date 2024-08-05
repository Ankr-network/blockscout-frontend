import { Typography } from '@mui/material';

import { GradientedText } from 'modules/common/components/GradientedText';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { BannerBox } from './components/BannerBox';
import { referralBonusBannerTranslation } from './translation';
import { useReferralBonusBannerStyles } from './useReferralBonusBannerStyles';

export interface IReferralBonusBannerProps {
  className?: string;
}

export const ReferralBonusBanner = ({
  className,
}: IReferralBonusBannerProps) => {
  const { classes, cx } = useReferralBonusBannerStyles();
  const { keys, t } = useTranslation(referralBonusBannerTranslation);

  const premiumLabel = t(keys.premiumLabel);
  const [titleStart, titleEnd] = t(keys.title).split(premiumLabel);

  return (
    <BannerBox className={cx(classes.root, className)}>
      <Typography variant="subtitle1">
        {titleStart}
        <GradientedText>{premiumLabel}</GradientedText>
        {titleEnd}
      </Typography>
      <Typography className={classes.description} variant="body3">
        {t(keys.desciption)}
      </Typography>
    </BannerBox>
  );
};
