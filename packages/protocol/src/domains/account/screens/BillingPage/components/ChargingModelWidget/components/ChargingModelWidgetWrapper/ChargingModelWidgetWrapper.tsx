import { EChargingModel } from 'modules/payments/types';

import { ChargingModelWidget } from '../ChargingModelWidget';
import { BalanceProgressBar } from '../BalanceProgressBar';

interface IChargingModelWidgetWrapperProps {
  balance: React.ReactNode;
  isCurrentModel?: boolean;
  isPromo?: boolean;
  maxLabel?: string;
  progressLabel?: string;
  progressValue?: number;
  type: EChargingModel;
}

export const ChargingModelWidgetWrapper = ({
  balance,
  isCurrentModel = false,
  isPromo,
  maxLabel,
  progressLabel,
  progressValue,
  type,
}: IChargingModelWidgetWrapperProps) => {
  return (
    <ChargingModelWidget
      isPromo={isPromo}
      isCurrentModel={isCurrentModel}
      chargingModel={type}
    >
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
