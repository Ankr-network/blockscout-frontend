import { renderLabel } from 'domains/account/screens/BillingPage/utils/renderLabel';
import { EChargingModel, IChargingModelData } from 'modules/billing/types';
import { ProgressBar } from 'modules/common/components/ProgressBar';
import { useMemo } from 'react';
import { useBalanceMenuStyles } from './useBalanceMenuStyles';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

export interface IBalanceMenuContentProps {
  currentChargingModel: IChargingModelData;
  balance: string;
  creditBalance?: string;
  usdBalance: string;
  balanceInRequests?: string;
  isApiCreditsBalance: boolean;
}

const usdBalanceKey = 'account.account-details.balance-widget.usd-balance';
const reqBalanceKey = 'account.account-details.balance-widget.req-balance';

const creditBalanceKey =
  'account.account-details.balance-widget.credit-balance';
const requestBalanceKey =
  'account.account-details.balance-widget.requests-balance';

export const BalanceMenuContent = ({
  currentChargingModel,
  balance,
  creditBalance,
  usdBalance,
  balanceInRequests,
  isApiCreditsBalance,
}: IBalanceMenuContentProps) => {
  const { classes } = useBalanceMenuStyles();

  const { type } = currentChargingModel;

  const label = useMemo(() => {
    return renderLabel({
      currentChargingModelType: type,
      isSmall: true,
      className: classes.label,
    });
  }, [type]);

  const balanceKey = isApiCreditsBalance ? creditBalanceKey : requestBalanceKey;

  const progressBar = useMemo(() => {
    switch (type) {
      case EChargingModel.Package:
      case EChargingModel.Deal:
        return (
          <ProgressBar
            max={100}
            className={classes.progressBar}
            progressLabel={currentChargingModel.progressLabel}
            progress={currentChargingModel.progressValue}
          />
        );
      case EChargingModel.PAYG:
      default:
        return null;
    }
  }, [classes, currentChargingModel, type]);

  return (
    <>
      <div className={classes.header}>
        <Typography variant="subtitle3">
          {t('header.balance-menu.title')}
        </Typography>
        {label}
      </div>
      <Typography component="p" variant="subtitle1" className={classes.balance}>
        {t(balanceKey, {
          balance,
        })}
      </Typography>

      <Typography
        component="p"
        variant="body4"
        className={classes.detailedBalance}
      >
        {t(usdBalanceKey, { balance: usdBalance })}
        {creditBalance && t(reqBalanceKey, { balance: balanceInRequests })}
      </Typography>

      {progressBar}
    </>
  );
};
