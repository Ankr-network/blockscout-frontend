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
}

export const ConfirmButton = ({
  activeStep,
  isPending,
  onClick: handleClick,
  status,
  isWrongNetwork,
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
