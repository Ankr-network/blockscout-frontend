import { Box, Tooltip } from '@mui/material';
import { Info } from '@ankr.com/ui';

import { PremiumLabel } from '../PremiumLabel';
import { useEndpointsHeaderStyles } from './EndpointsHeaderStyles';

export interface EndpointsHeaderProps {
  hasPremium?: boolean;
  isPremiumLabelHidden?: boolean;
  title: string;
  tooltipText?: string;
}

export const EndpointsHeader = ({
  hasPremium,
  isPremiumLabelHidden,
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
      {hasPremium && !isPremiumLabelHidden && <PremiumLabel />}
    </Box>
  );
};
