import { Button } from '@mui/material';
import { ExternalLink } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { PRICING_LINK } from 'domains/account/actions/topUp/const';

import { usePricingLinkStyles } from './PricingLinkStyles';

export interface PricingLinkProps {
  className?: string;
}

export const PricingLink = ({ className }: PricingLinkProps) => {
  const { classes, cx } = usePricingLinkStyles();

  return (
    <div className={cx(classes.root, className)}>
      <Button
        className={classes.link}
        color="primary"
        endIcon={<ExternalLink />}
        href={PRICING_LINK}
        target="_blank"
        variant="text"
      >
        {t('account.account-details.top-up.pricing-link')}
      </Button>
    </div>
  );
};
