import React from 'react';
import { Box, Container, Paper, Typography } from '@material-ui/core';

import { useStyles } from './TopUpStepsStyles';
import { t } from 'modules/i18n/utils/intl';
import { Stepper } from './Stepper';
import { StepperTitle } from './StepperTitle';
import { StepperNotice } from './StepperNotice';
import { ITopUpStepsProps } from './TopUpStepsTypes';
import { TopUpStep } from 'domains/account/actions/topUp/const';
import { TransactionButton } from './TransactionButton';
import { Buttons } from './Buttons';

export const TopUpSteps = ({
  step,
  onConfirm,
  onReject,
  loading,
  amount,
  hasCredentials,
  isRejectAllowanceLoading,
}: ITopUpStepsProps) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Paper variant="elevation" className={classes.paper} elevation={0}>
        <Box className={classes.content}>
          <Typography variant="h4" color="primary">
            {t('top-up-steps.title')}
          </Typography>
          <Stepper
            step={step}
            className={classes.stepper}
            hasCredentials={hasCredentials}
          />
          <StepperTitle step={step} className={classes.title} amount={amount} />
          <StepperNotice step={step} className={classes.notice} />
          {step === TopUpStep.waitTransactionConfirming && (
            <TransactionButton />
          )}
        </Box>
        <Buttons
          onConfirm={onConfirm}
          onReject={onReject}
          loading={loading}
          isRejectAllowanceLoading={isRejectAllowanceLoading}
          hasCredentials={hasCredentials}
          step={step}
        />
      </Paper>
    </Container>
  );
};
