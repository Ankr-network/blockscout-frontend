import { Box, Container, Paper, Typography } from '@material-ui/core';
import { Spinner } from 'ui';

import { t } from 'modules/i18n/utils/intl';
import { useLoaderStyles } from './LoaderStyles';

export const Loader = () => {
  const classes = useLoaderStyles();

  return (
    <Container className={classes.root}>
      <Paper variant="elevation" className={classes.paper} elevation={0}>
        <Box className={classes.content}>
          <Typography
            variant="body2"
            className={classes.header}
            color="textSecondary"
          >
            {t('account.operation-loader')}
          </Typography>
          <Box className={classes.spinnerContainer}>
            <Spinner size={30} />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
