import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';

import { t } from 'modules/i18n/utils/intl';
import { usePricingHeaderStyles } from './PricingHeaderStyles';

interface PricingHeaderProps {
  isLoading: boolean;
  balance: BigNumber;
}

export const PricingHeader = ({ isLoading, balance }: PricingHeaderProps) => {
  const classes = usePricingHeaderStyles();

  return (
    <Box className={classes.formBlockTitle}>
      {isLoading ? (
        <Skeleton className={classes.balanceSkeleton} variant="rect" />
      ) : (
        <Typography
          className={classes.formAmount}
          variant="subtitle1"
          color="textSecondary"
        >
          {t('plan.premium-block.amount', {
            value: balance?.toFormat() || 0,
          })}
        </Typography>
      )}
    </Box>
  );
};
