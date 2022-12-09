import { Box, Container, Paper, Typography } from '@material-ui/core';

import { useWithdrawDisabledStyles } from './WithdrawDisabledStyles';
import { t, tHTML } from 'modules/i18n/utils/intl';

export const WithdrawDisabled = () => {
  const classes = useWithdrawDisabledStyles();

  return (
    <Container className={classes.root}>
      <Paper
        variant="elevation"
        className={classes.paper}
        elevation={0}
        style={{
          height: 'auto',
        }}
      >
        <Box className={classes.content}>
          <Typography variant="h4" className={classes.header}>
            {t('withdraw.title')}
          </Typography>
          <Typography variant="body1" className={classes.disabledTitle}>
            {tHTML('withdraw.disabled-content')}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
