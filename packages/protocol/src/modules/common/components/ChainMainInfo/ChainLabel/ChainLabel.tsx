import { Typography } from '@mui/material';
import { Check } from '@ankr.com/ui';

import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { StatusCircle } from 'uiKit/StatusCircle';

import { useStyles } from './ChainLabelStyles';

interface ArchiveLabelProps {
  className?: string;
  label: string;
  labelClassName?: string;
  tooltip?: string;
  isStatusIndicatorVisible?: boolean;
  isCheckIconVisible?: boolean;
}

export const ChainLabel = ({
  className = '',
  isCheckIconVisible = false,
  isStatusIndicatorVisible,
  label,
  labelClassName,
  tooltip = '',
}: ArchiveLabelProps) => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.tool, className)}>
      <TooltipWrapper hasIcon={false} tooltipText={tooltip}>
        <Typography
          className={cx(classes.chainLabel, labelClassName)}
          component="div"
          variant="body4"
          color="textSecondary"
        >
          {isCheckIconVisible && <Check className={classes.icon} />}
          {isStatusIndicatorVisible && (
            <StatusCircle mr={2} status="success" className={classes.circle} />
          )}
          <span>{label}</span>
        </Typography>
      </TooltipWrapper>
    </div>
  );
};
