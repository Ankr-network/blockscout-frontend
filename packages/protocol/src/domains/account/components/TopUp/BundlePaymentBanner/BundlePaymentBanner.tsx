import { Button } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import { GradientedText } from 'modules/common/components/GradientedText';

import { BundleIcon } from '../USDTopUpForm/BundleIcon';
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
            {tHTML(`${intlRoot}.top`)}
          </GradientedText>
          <GradientedText gradient={gradient}>
            {tHTML(`${intlRoot}.bottom`)}
          </GradientedText>
        </div>
      </div>
      <Button className={classes.button} onClick={onClick} variant="outlined">
        {t(`${intlRoot}.button`)}
      </Button>
    </div>
  );
};
