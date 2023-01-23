import { Skeleton, Box, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { t } from '@ankr.com/common';

import { usePricingTopUpStyles } from './PricingHeaderStyles';

interface PricingHeaderProps {
  isLoading: boolean;
  balance: BigNumber;
}

export const PricingHeader = ({ isLoading, balance }: PricingHeaderProps) => {
  const { classes } = usePricingTopUpStyles();

  return (
    <Box className={classes.formBlockTitle}>
      {isLoading ? (
        <Skeleton className={classes.balanceSkeleton} variant="rectangular" />
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
