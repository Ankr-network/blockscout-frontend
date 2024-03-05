import { EChargingModel } from 'modules/billing/types';

import { ChargingModelWidget } from '../ChargingModelWidget';
import { BalanceProgressBar } from '../BalanceProgressBar';

interface IChargingModelWidgetWrapperProps {
  isCurrentModel?: boolean;
  balance: React.ReactNode;
  chargingModel: EChargingModel;
  progressValue?: number;
  progressLabel?: string;
  maxLabel?: string;
}

export const ChargingModelWidgetWrapper = ({
  isCurrentModel = false,
  balance,
  chargingModel,
  progressValue,
  progressLabel,
  maxLabel,
}: IChargingModelWidgetWrapperProps) => {
  return (
    <ChargingModelWidget
      isCurrentModel={isCurrentModel}
      chargingModel={chargingModel}
    >
      {balance}
      <BalanceProgressBar
        chargingModel={chargingModel}
        progressValue={progressValue}
        progressLabel={progressLabel}
        maxLabel={maxLabel}
      />
    </ChargingModelWidget>
  );
};
