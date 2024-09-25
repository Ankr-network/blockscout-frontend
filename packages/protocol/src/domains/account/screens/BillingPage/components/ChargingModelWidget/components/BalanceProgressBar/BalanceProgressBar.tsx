import { EChargingModel } from 'modules/payments/types';
import { ProgressBar } from 'modules/common/components/ProgressBar';

import { PromoProgressBar } from '../PromoProgressBar';

interface IBalanceProgressBarProps {
  chargingModel: EChargingModel;
  maxLabel?: string;
  progressLabel?: string;
  progressValue?: number;
}

export const BalanceProgressBar = ({
  chargingModel,
  maxLabel,
  progressLabel,
  progressValue,
}: IBalanceProgressBarProps) => {
  switch (chargingModel) {
    case EChargingModel.Promo:
      return <PromoProgressBar expiresAt={maxLabel} />;
    case EChargingModel.Deal:
    case EChargingModel.Package:
      return (
        <ProgressBar
          max={100}
          maxLabel={maxLabel}
          progress={progressValue}
          progressLabel={progressLabel}
        />
      );

    default:
    case EChargingModel.PAYG:
      return null;
  }
};
