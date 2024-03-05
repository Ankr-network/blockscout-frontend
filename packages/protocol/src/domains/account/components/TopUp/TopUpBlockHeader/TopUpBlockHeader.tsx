import { Button, Box } from '@mui/material';
import { ExternalLink } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { PRICING_PLANS_LINK } from 'domains/account/actions/topUp/const';
import { WidgetTitle } from 'domains/account/screens/BillingPage/components/WidgetTitle';

import { useTopUpBlockHeaderStyles } from './TopUpBlockHeaderStyles';

interface TopUpBlockHeaderProps {
  hasHeader?: boolean;
}

export const TopUpBlockHeader = ({
  hasHeader = true,
}: TopUpBlockHeaderProps) => {
  const { classes } = useTopUpBlockHeaderStyles();

  return (
    <Box className={classes.top}>
      {hasHeader && (
        <WidgetTitle>{t('account.account-details.top-up.title')}</WidgetTitle>
      )}
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
