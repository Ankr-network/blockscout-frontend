import { Typography } from '@mui/material';

import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { StatusCircle } from 'uiKit/StatusCircle';
import { useStyles } from './ChainLabelStyles';

export interface ArchiveLabelProps {
  className?: string;
  label: string;
  labelClassName?: string;
  tooltip?: string;
}

export const ChainLabel = ({
  className = '',
  label,
  tooltip = '',
  labelClassName,
}: ArchiveLabelProps) => {
  const { classes, cx } = useStyles();

  return (
    <div className={className}>
      <TooltipWrapper hasIcon={false} tooltipText={tooltip}>
        <Typography
          className={cx(labelClassName, classes.label)}
          component="div"
          variant="body2"
        >
          <StatusCircle mr={0.4} status="success" /> {label}
        </Typography>
      </TooltipWrapper>
    </div>
  );
};
