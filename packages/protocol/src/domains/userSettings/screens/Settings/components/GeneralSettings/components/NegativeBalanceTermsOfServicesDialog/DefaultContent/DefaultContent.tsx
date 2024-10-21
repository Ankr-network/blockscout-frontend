import { Button, Typography } from '@mui/material';
import { Warning } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { SUPPORT_PORTAL_LINK } from 'modules/common/constants/const';

import { useDefaultContentStyles } from './useDefaultContentStyles';

interface DefaultContentProps {
  handleClose: () => void;
}

export const DefaultContent = ({ handleClose }: DefaultContentProps) => {
  const { classes } = useDefaultContentStyles();

  return (
    <div>
      <Typography variant="h5" className={classes.title}>
        {t('negative-balance-terms-of-services.title')}
      </Typography>
      <Typography variant="body1" className={classes.text}>
        {t('negative-balance-terms-of-services.text-1')}
      </Typography>
      <div className={classes.balance}>
        <Warning className={classes.icon} />
        <Typography variant="subtitle1" className={classes.balanceText}>
          {t('negative-balance-terms-of-services.balance')}
        </Typography>
      </div>
      <Typography className={classes.text}>
        {t('negative-balance-terms-of-services.text-2')}
      </Typography>
      <Typography variant="body2" className={classes.tip}>
        {t('negative-balance-terms-of-services.tip')}
      </Typography>
      <Button
        fullWidth
        size="large"
        className={classes.button}
        onClick={handleClose}
      >
        {t('negative-balance-terms-of-services.confirm-button')}
      </Button>
      <Button
        fullWidth
        href={SUPPORT_PORTAL_LINK}
        size="large"
        target="_blank"
        variant="outlined"
      >
        {t('negative-balance-terms-of-services.contact-button')}
      </Button>
    </div>
  );
};
