import { useCallback } from 'react';
import { LoadingButton } from '@ankr.com/ui';

import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/billing/types';
import { useTooltip } from 'modules/common/components/TextTooltip';

import { Tooltip } from './components/Tooltip';
import { renderButtonText } from './utils/renderButtonText';

export interface IConfirmButtonProps {
  activeStep: ECryptoDepositStep;
  isPending: boolean;
  onClick: () => void;
  status: ECryptoDepositStepStatus;
  isWrongNetwork: boolean;
  isConfirmationBlocksWaiting: boolean;
}

export const ConfirmButton = ({
  activeStep,
  isPending,
  onClick: handleClick,
  status,
  isWrongNetwork,
  isConfirmationBlocksWaiting,
}: IConfirmButtonProps) => {
  const tooltipProps = useTooltip();

  const { onOpen: handleTooltipOpen } = tooltipProps;

  const isLoading = isPending || isConfirmationBlocksWaiting;

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
          isPending,
          status,
          isWrongNetwork,
          isConfirmationBlocksWaiting,
        })}
      </LoadingButton>
    </Tooltip>
  );
};
