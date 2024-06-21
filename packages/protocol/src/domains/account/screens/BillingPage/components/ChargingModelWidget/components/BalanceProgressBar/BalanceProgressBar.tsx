import { ProgressBar } from 'modules/common/components/ProgressBar';
import { EChargingModel } from 'modules/billing/types';

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
