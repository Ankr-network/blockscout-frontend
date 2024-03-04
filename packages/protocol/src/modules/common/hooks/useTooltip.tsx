import { TooltipProps } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

export interface IUseTooltipProps extends TooltipProps {}

export const useTooltip = (props: IUseTooltipProps) => {
  const [isOpened, setIsOpened] = useState(Boolean(props.open));

  const handleOpen = useCallback(() => setIsOpened(false), []);
  const handleClose = useCallback(() => setIsOpened(false), []);

  const tooltipProps = useMemo<TooltipProps>(
    () => ({ ...props, isOpened }),
    [isOpened, props],
  );

  return { handleOpen, handleClose, tooltipProps };
};
