import { Box } from '@mui/material';

import { PremiumLabel } from '../PremiumLabel';
import { useEndpointsHeaderStyles } from './EndpointsHeaderStyles';

export interface EndpointsHeaderProps {
  hasPremium?: boolean;
  isPremiumLabelHidden?: boolean;
  title: string;
}

export const EndpointsHeader = ({
  hasPremium,
  isPremiumLabelHidden,
  title,
}: EndpointsHeaderProps) => {
  const { classes } = useEndpointsHeaderStyles();

  return (
    <Box className={classes.endpointsHeader} component="h2">
      {title}
      {hasPremium && !isPremiumLabelHidden && <PremiumLabel />}
    </Box>
  );
};
