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
  isPending: boolean;
  isWrongNetwork: boolean;
  onClick: () => void;
  status: ECryptoDepositStepStatus;
}

export const ConfirmButton = ({
  activeStep,
  isPending,
  isWrongNetwork,
  onClick: handleClick,
  status,
}: IConfirmButtonProps) => {
  const tooltipProps = useTooltip();

  const { onOpen: handleTooltipOpen } = tooltipProps;

  const onClick = useCallback(() => {
    if (isPending) {
      handleTooltipOpen();
    } else {
      handleClick();
    }
  }, [handleClick, handleTooltipOpen, isPending]);

  return (
    <Tooltip {...tooltipProps}>
      <LoadingButton
        fullWidth
        isDisabledWhenLoading={false}
        loading={isPending}
        onClick={onClick}
        size="large"
        variant="contained"
      >
        {renderButtonText({ activeStep, isPending, status, isWrongNetwork })}
      </LoadingButton>
    </Tooltip>
  );
};
