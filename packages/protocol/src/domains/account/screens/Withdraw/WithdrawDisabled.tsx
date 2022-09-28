import { Box, Container, Paper, Typography } from '@material-ui/core';

import { useStyles } from './components/WithdrawSteps/WithdrawStepsStyles';
import { t, tHTML } from 'modules/i18n/utils/intl';

export const WithdrawDisabled = () => {
  const classes = useStyles();

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
            {t('withdraw-steps.title')}
          </Typography>
          <Typography variant="body1" className={classes.disabledTitle}>
            {tHTML('withdraw-steps.disabled-content')}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
