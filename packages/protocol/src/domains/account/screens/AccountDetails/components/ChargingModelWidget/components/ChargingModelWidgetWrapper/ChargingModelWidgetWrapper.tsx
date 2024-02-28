import { EChargingModel } from 'modules/billing/types';

import { ChargingModelWidget } from '../ChargingModelWidget';
import { BalanceProgressBar } from '../BalanceProgressBar';

interface IChargingModelWidgetWrapperProps {
  isCurrentModel?: boolean;
  balance: React.ReactNode;
  chargingModel: EChargingModel;
  isExpired?: boolean;
  progressValue?: number;
  progressLabel?: string;
  maxLabel?: string;
  onSwitchChargingModel?: () => void;
}

export const ChargingModelWidgetWrapper = ({
  isCurrentModel = false,
  balance,
  chargingModel,
  isExpired,
  progressValue,
  progressLabel,
  maxLabel,
  onSwitchChargingModel,
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
        isExpired={isExpired}
        onSwitchChargingModel={onSwitchChargingModel}
      />
    </ChargingModelWidget>
  );
};
