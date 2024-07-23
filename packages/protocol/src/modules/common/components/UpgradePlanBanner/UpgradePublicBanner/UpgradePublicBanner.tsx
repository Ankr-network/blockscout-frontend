import { Typography, Button } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import { useUpgradePublicBannerStyles } from './useUpgradePublicBannerStyles';

export interface IUpgradePublicBannerProps {
  onGetPremiumButtonClick: () => void;
}

export const UpgradePublicBanner = ({
  onGetPremiumButtonClick,
}: IUpgradePublicBannerProps) => {
  const { classes } = useUpgradePublicBannerStyles();

  return (
    <div className={classes.root}>
      <div className={classes.image} />
      <div className={classes.content}>
        <div className={classes.textRoot}>
          <Typography
            component="p"
            variant="subtitle1"
            className={classes.title}
          >
            {tHTML('banner.public.title')}
          </Typography>
          <Typography variant="body3" className={classes.typography}>
            {t('banner.public.description')}
          </Typography>
        </div>

        <Button
          size="medium"
          variant="contained"
          className={classes.button}
          onClick={onGetPremiumButtonClick}
        >
          <Typography className={classes.buttonText} variant="body2">
            {t('banner.public.button')}
          </Typography>
        </Button>
      </div>
    </div>
  );
};
