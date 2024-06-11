import { useCallback } from 'react';

import { useTooltip } from 'modules/common/components/TextTooltip';
import { EMilliSeconds } from 'modules/common/constants/const';
import { useTimeout } from 'modules/common/hooks/useTimeout';

export const useCopyButton = () => {
  const tooltipProps = useTooltip();

  const { onClose: handleTooltipClose, onOpen: handleTooltipOpen } =
    tooltipProps;

  const { run } = useTimeout({
    delay: EMilliSeconds.Second,
    onTimeout: handleTooltipClose,
  });

  const onCopy = useCallback(() => {
    handleTooltipOpen();
    run();
  }, [handleTooltipOpen, run]);

  return { onCopy, tooltipProps };
};
