import { Button, Typography, Box } from '@mui/material';
import { ExternalLink } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { PRICING_PLANS_LINK } from 'domains/account/actions/topUp/const';

import { useHeaderStyles } from './HeaderStyles';

export const Header = () => {
  const { classes } = useHeaderStyles();

  return (
    <Box className={classes.top}>
      <Typography className={classes.title} variant="subtitle1">
        {t('account.account-details.top-up.title')}
      </Typography>
      <Button
        className={classes.link}
        classes={{
          endIcon: classes.endIcon,
        }}
        color="primary"
        endIcon={<ExternalLink />}
        href={PRICING_PLANS_LINK}
        target="_blank"
        variant="text"
      >
        {t('account.account-details.top-up.pricing-link')}
      </Button>
    </Box>
  );
};
