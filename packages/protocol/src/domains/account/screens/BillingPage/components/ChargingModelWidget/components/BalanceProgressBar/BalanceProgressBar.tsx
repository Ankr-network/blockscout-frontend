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
    case EChargingModel.Package:
      return (
        <>
          <ProgressBar
            progress={progressValue}
            max={100}
            progressLabel={progressLabel}
            maxLabel={maxLabel}
          />
        </>
      );

    case EChargingModel.Deal:
      return (
        <ProgressBar
          progress={progressValue}
          max={100}
          progressLabel={progressLabel}
          maxLabel={maxLabel}
        />
      );

    default:
    case EChargingModel.PAYG:
      return null;
  }
};
