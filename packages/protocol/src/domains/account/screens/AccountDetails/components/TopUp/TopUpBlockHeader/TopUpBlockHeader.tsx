import { Button, Typography, Box } from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';
import { useTopUpBlockHeaderStyles } from './TopUpBlockHeaderStyles';
import { PRICING_LINK } from '../../const';

export const TopUpBlockHeader = () => {
  const classes = useTopUpBlockHeaderStyles();

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
