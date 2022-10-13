import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { TopUp } from 'domains/account/screens/AccountDetails/components/TopUp';
import { TopUpFormContext } from 'domains/account/screens/AccountDetails/components/TopUp/TopUpForm/TopUpFormUtils';
import { t } from 'modules/i18n/utils/intl';
import { usePricingTopUpStyles } from './PricingTopUpStyles';
import {
  defaultInitialValues,
  useAccountBalance,
  validateAmount,
} from './PricingTopUpUtils';

export const PricingTopUp = () => {
  const { balance, isLoading } = useAccountBalance();
  const classes = usePricingTopUpStyles();

  return (
    <TopUpFormContext.Provider
      value={{
        initialValues: defaultInitialValues,
        hasRateBlock: false,
        validateAmount,
        balance,
      }}
    >
      <TopUp
        header={
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
        }
      />
    </TopUpFormContext.Provider>
  );
};
