import { Button, Typography, Box } from '@mui/material';

import { t } from '@ankr.com/common';
import { PRICING_LINK } from 'domains/account/actions/topUp/const';
import { useTopUpBlockHeaderStyles } from './TopUpBlockHeaderStyles';

export const TopUpBlockHeader = () => {
  const { classes } = useTopUpBlockHeaderStyles();

  return (
    <Box className={classes.top}>
      <Typography variant="subtitle1" className={classes.title}>
        {t('account.account-details.top-up.title')}
      </Typography>
      <Button
        className={classes.link}
        href={PRICING_LINK}
        color="primary"
        target="_blank"
        variant="text"
      >
        {t('account.account-details.top-up.pricing-link')}
      </Button>
    </Box>
  );
};
