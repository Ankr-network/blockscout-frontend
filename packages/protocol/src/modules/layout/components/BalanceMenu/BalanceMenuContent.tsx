import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { ChargingModelLabel } from 'domains/account/screens/BillingPage/components/ChargingModelLabel/ChargingModelLabel';
import { EChargingModel, IChargingModelData } from 'modules/payments/types';
import { ProgressBar } from 'modules/common/components/ProgressBar';
import { renderCreditBalance } from 'modules/billing/utils/renderCreditBalance';
import { renderRequestsBalance } from 'modules/billing/utils/renderRequestsBalance';
import { renderUsdBalance } from 'modules/billing/utils/renderUsdBalance';

import { useBalanceMenuStyles } from './useBalanceMenuStyles';

export interface IBalanceMenuContentProps {
  balanceInRequests?: number;
  creditBalance?: number;
  currentChargingModel: IChargingModelData;
  isApiCreditsBalance: boolean;
  usdBalance: number;
}

export const BalanceMenuContent = ({
  balanceInRequests = 0,
  creditBalance = 0,
  currentChargingModel,
  isApiCreditsBalance,
  usdBalance,
}: IBalanceMenuContentProps) => {
  const { classes } = useBalanceMenuStyles();

  const { type } = currentChargingModel;

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

  const creditBalanceString = renderCreditBalance({ creditBalance });
  const requestsBalance = renderRequestsBalance({
    requestsBalance: balanceInRequests,
  });
  const usdBalanceString = renderUsdBalance({ usdBalance });

  const detailedRequestsBalance = renderRequestsBalance({
    isApproximate: true,
    isShortened: true,
    prefix: `${usdBalanceString} / `,
    requestsBalance: balanceInRequests,
  });

  const [balance, detailedBalance] = isApiCreditsBalance
    ? [creditBalanceString, detailedRequestsBalance]
    : [requestsBalance, usdBalanceString];

  return (
    <>
      <div className={classes.header}>
        <Typography variant="subtitle3">
          {t('header.balance-menu.title')}
        </Typography>
        <ChargingModelLabel
          currentChargingModel={currentChargingModel}
          currentChargingModelType={type}
          size="small"
          className={classes.label}
        />
      </div>
      <Typography component="p" variant="subtitle1" className={classes.balance}>
        {balance}
      </Typography>
      <Typography
        component="p"
        variant="body4"
        className={classes.detailedBalance}
      >
        {detailedBalance}
      </Typography>
      {progressBar}
    </>
  );
};
