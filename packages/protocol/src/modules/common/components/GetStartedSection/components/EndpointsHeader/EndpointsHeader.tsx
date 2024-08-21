import { Box, Tooltip } from '@mui/material';
import { Info } from '@ankr.com/ui';

import { useEndpointsHeaderStyles } from './EndpointsHeaderStyles';

export interface EndpointsHeaderProps {
  title: string;
  tooltipText?: string;
}

export const EndpointsHeader = ({
  title,
  tooltipText,
}: EndpointsHeaderProps) => {
  const { classes } = useEndpointsHeaderStyles();

  return (
    <Box className={classes.endpointsHeader} component="h2">
      {title}
      {tooltipText && (
        <Tooltip title={tooltipText}>
          <Info className={classes.tooltipIcon} />
        </Tooltip>
      )}
    </Box>
  );
};
