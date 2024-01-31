import { useCallback } from 'react';

import { useTooltip } from 'modules/common/components/TextTooltip';
import { MilliSeconds } from 'modules/common/constants/const';
import { useTimeout } from 'modules/common/hooks/useTimeout';

export const usePersonalAccountInfoCopyButton = () => {
  const tooltipProps = useTooltip();

  const { onClose: handleTooltipClose, onOpen: handleTooltipOpen } =
    tooltipProps;

  const { run } = useTimeout({
    delay: MilliSeconds.Second,
    onTimeout: handleTooltipClose,
  });

  const onCopy = useCallback(() => {
    handleTooltipOpen();
    run();
  }, [handleTooltipOpen, run]);

  return { onCopy, tooltipProps };
};
