import { useCallback } from 'react';
import { LoadingButton } from '@ankr.com/ui';

import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/payments/types';
import { useTooltip } from 'modules/common/components/TextTooltip';

import { Tooltip } from './components/Tooltip';
import { renderButtonText } from './utils/renderButtonText';

export interface IConfirmButtonProps {
  activeStep: ECryptoDepositStep;
  isDepositConfirming: boolean;
  isPending: boolean;
  isNetworkWrong?: boolean;
  onClick: () => void;
  status: ECryptoDepositStepStatus;
}

export const ConfirmButton = ({
  activeStep,
  isDepositConfirming,
  isNetworkWrong,
  isPending,
  onClick: handleClick,
  status,
}: IConfirmButtonProps) => {
  const tooltipProps = useTooltip();

  const { onOpen: handleTooltipOpen } = tooltipProps;

  const isLoading = isPending || isDepositConfirming;

  const onClick = useCallback(() => {
    if (isLoading) {
      handleTooltipOpen();
    } else {
      handleClick();
    }
  }, [handleClick, handleTooltipOpen, isLoading]);

  return (
    <Tooltip {...tooltipProps}>
      <LoadingButton
        fullWidth
        isDisabledWhenLoading={false}
        loading={isLoading}
        onClick={onClick}
        size="large"
        variant="contained"
      >
        {renderButtonText({
          activeStep,
          isDepositConfirming,
          isNetworkWrong,
          isPending,
          status,
        })}
      </LoadingButton>
    </Tooltip>
  );
};
