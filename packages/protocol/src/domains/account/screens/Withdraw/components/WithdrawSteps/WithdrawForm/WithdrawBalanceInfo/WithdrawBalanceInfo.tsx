import BigNumber from 'bignumber.js';
import { Typography } from '@material-ui/core';

import { tHTML } from 'modules/i18n/utils/intl';
import { MIN_AMOUNT } from 'domains/account/actions/withdraw/const';
import { renderBalance } from 'domains/account/utils/formatBalance';
import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { useWithdrawBalanceInfoStyles } from './WithdrawBalanceInfoStyles';

interface WithdrawBalanceInfoProps {
  ankrBalanceWithoutVouchers: BigNumber;
  voucherBalance: BigNumber;
}

export const WithdrawBalanceInfo = ({
  ankrBalanceWithoutVouchers,
  voucherBalance,
}: WithdrawBalanceInfoProps) => {
  const classes = useWithdrawBalanceInfoStyles();

  return (
    <>
      {ankrBalanceWithoutVouchers.isGreaterThanOrEqualTo(MIN_AMOUNT) && (
        <Typography variant="subtitle1" className={classes.balance}>
          {tHTML('withdraw-steps.form.balance', {
            value: renderBalance(ankrBalanceWithoutVouchers),
          })}
        </Typography>
      )}
      {voucherBalance.isGreaterThan(0) && (
        <TooltipWrapper
          tooltipClassName={classes.tooltip}
          tooltipText={
            <Typography variant="body2" align="left">
              {tHTML('withdraw-steps.form.credits-info')}
            </Typography>
          }
        >
          <Typography variant="subtitle1" className={classes.balance}>
            {tHTML('withdraw-steps.form.credits', {
              value: renderBalance(voucherBalance),
            })}
          </Typography>
        </TooltipWrapper>
      )}
    </>
  );
};
