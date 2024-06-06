import { ProgressBar } from 'modules/common/components/ProgressBar';
import { EChargingModel } from 'modules/billing/types';

import { LastPackageWarning } from '../../../LastPackageWarning';

interface IBalanceProgressBarProps {
  chargingModel: EChargingModel;
  progressValue?: number;
  progressLabel?: string;
  maxLabel?: string;
  isNoticeHidden?: boolean;
}

export const BalanceProgressBar = ({
  chargingModel,
  isNoticeHidden,
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
          {!isNoticeHidden && <LastPackageWarning />}
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
