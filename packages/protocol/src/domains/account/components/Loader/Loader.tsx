import { Box, Container, Paper, Typography } from '@mui/material';
import { OverlaySpinner } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { useLoaderStyles } from './LoaderStyles';

export const Loader = () => {
  const { classes } = useLoaderStyles();

  return (
    <Container className={classes.root}>
      <Paper variant="elevation" className={classes.paper} elevation={0}>
        <Box>
          <Typography variant="body2" color="textSecondary">
            {t('account.operation-loader')}
          </Typography>
          <Box className={classes.spinnerContainer}>
            <OverlaySpinner size={30} />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
