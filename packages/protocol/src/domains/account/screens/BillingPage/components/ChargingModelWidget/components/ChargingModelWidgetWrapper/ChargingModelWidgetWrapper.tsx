import { EChargingModel } from 'modules/payments/types';

import { ChargingModelWidget } from '../ChargingModelWidget';
import { BalanceProgressBar } from '../BalanceProgressBar';

interface IChargingModelWidgetWrapperProps {
  isCurrentModel?: boolean;
  balance: React.ReactNode;
  type: EChargingModel;
  progressValue?: number;
  progressLabel?: string;
  maxLabel?: string;
}

export const ChargingModelWidgetWrapper = ({
  balance,
  isCurrentModel = false,
  maxLabel,
  progressLabel,
  progressValue,
  type,
}: IChargingModelWidgetWrapperProps) => {
  return (
    <ChargingModelWidget isCurrentModel={isCurrentModel} chargingModel={type}>
      {balance}
      <BalanceProgressBar
        chargingModel={type}
        progressValue={progressValue}
        progressLabel={progressLabel}
        maxLabel={maxLabel}
      />
    </ChargingModelWidget>
  );
};
