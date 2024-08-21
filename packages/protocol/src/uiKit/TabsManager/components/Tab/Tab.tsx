import { Tooltip, Typography } from '@mui/material';
import { useCallback } from 'react';

import { useTooltip } from 'modules/common/components/TextTooltip';

import { Tab as ITab } from '../../TabsManagerTypes';
import { useTabStyles } from './useTabStyles';

export interface ITabProps<TI> extends ITab<TI> {
  className?: string;
  index?: number;
  selectedTab?: ITab<TI>;
}

export function Tab<TI>({
  className,
  id,
  index,
  isDisabled,
  onSelect,
  selectedTab,
  title,
  tooltip,
}: ITabProps<TI>) {
  const { classes, cx } = useTabStyles();

  const tooltipProps = useTooltip();

  const onSelectTab = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      onSelect?.();
    },
    [onSelect],
  );

  const tabBody = (
    <div
      className={cx(classes.tabRoot, className)}
      id={id.toString()}
      onClick={isDisabled ? undefined : onSelectTab}
      role="tab"
      tabIndex={index}
    >
      {typeof title === 'function'
        ? title(id === selectedTab?.id, isDisabled, id)
        : title}
    </div>
  );

  if (tooltip) {
    const tooltipTitle = (
      <Typography className={classes.tooltipTitle} variant="body3">
        {tooltip}
      </Typography>
    );

    return (
      <Tooltip {...tooltipProps} placement="top" title={tooltipTitle}>
        {tabBody}
      </Tooltip>
    );
  }

  return tabBody;
}
