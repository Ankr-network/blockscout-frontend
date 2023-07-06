import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import { BundleIcon } from '../USDTopUpForm/BundleIcon';
import { GradientedText } from 'modules/common/components/GradientedText';
import { intlRoot } from './const';
import { useBundlePaymentBannerStyles } from './BundlePaymentBannerStyles';
import { useGradient } from './hooks/useGradient';

export interface BundlePaymentBannerProps {
  onClick: () => void;
}

export const BundlePaymentBanner = ({ onClick }: BundlePaymentBannerProps) => {
  const { classes } = useBundlePaymentBannerStyles();

  const gradient = useGradient();

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <BundleIcon />
        <div className={classes.description}>
          <GradientedText gradient={gradient}>
            {t(`${intlRoot}.top`)}
          </GradientedText>
          <GradientedText gradient={gradient}>
            {t(`${intlRoot}.bottom`)}
          </GradientedText>
        </div>
      </div>
      <Button className={classes.button} onClick={onClick} variant="outlined">
        {t(`${intlRoot}.button`)}
      </Button>
    </div>
  );
};
