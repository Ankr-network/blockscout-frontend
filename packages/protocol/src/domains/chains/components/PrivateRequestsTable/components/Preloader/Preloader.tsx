import { Box } from '@mui/material';
import { OverlaySpinner } from '@ankr.com/ui';

import { usePreloaderStyles } from './PreloaderStyles';

export const Preloader = () => {
  const { classes } = usePreloaderStyles();

  return (
    <Box className={classes.root}>
      <OverlaySpinner />
    </Box>
  );
};
