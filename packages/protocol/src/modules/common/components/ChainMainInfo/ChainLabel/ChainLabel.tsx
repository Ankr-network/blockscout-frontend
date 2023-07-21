import { Typography } from '@mui/material';

import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { StatusCircle } from 'uiKit/StatusCircle';

import { useStyles } from './ChainLabelStyles';

interface ArchiveLabelProps {
  className?: string;
  label: string;
  labelClassName?: string;
  tooltip?: string;
  isStatusIndicatorVisible?: boolean;
}

export const ChainLabel = ({
  className = '',
  label,
  tooltip = '',
  labelClassName,
  isStatusIndicatorVisible = true,
}: ArchiveLabelProps) => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.tool, className)}>
      <TooltipWrapper hasIcon={false} tooltipText={tooltip}>
        <Typography
          className={cx(labelClassName, classes.label)}
          component="div"
          variant="body2"
        >
          {isStatusIndicatorVisible && (
            <StatusCircle mr={2} status="success" className={classes.circle} />
          )}
          <span>{label}</span>
        </Typography>
      </TooltipWrapper>
    </div>
  );
};
