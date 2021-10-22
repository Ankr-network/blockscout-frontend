import React from 'react';
import {
  Box,
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import { useStyles } from './useStyles';
import { t } from '../../../../../../modules/i18n/utils/intl';

export const Depositing = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper variant="elevation" className={classes.paper} elevation={0}>
        <Typography variant="h4" color="primary">
          {t('depositing.title')}
        </Typography>
        <Stepper activeStep={1} nonLinear className={classes.stepper}>
          <Step key={0} completed>
            <StepLabel />
          </Step>
          <Step key={1}>
            <StepLabel />
          </Step>
          <Step key={2}>
            <StepLabel />
          </Step>
          <Step key={3}>
            <StepLabel />
          </Step>
          <Step key={4}>
            <StepLabel />
          </Step>
        </Stepper>
        <Typography variant="h3" className={classes.content}>
          {t('depositing.step-content.0')}
        </Typography>
        <Typography
          variant="h4"
          color="textSecondary"
          className={classes.notice}
        >
          {t('depositing.step-notice.0')}
        </Typography>
        <Box maxWidth={210} width="100%">
          <Button fullWidth>{t('depositing.next')}</Button>
        </Box>
      </Paper>
    </div>
  );
};
