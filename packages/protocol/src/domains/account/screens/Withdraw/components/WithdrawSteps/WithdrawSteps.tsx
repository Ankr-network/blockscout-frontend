import React from 'react';
import { Box, Container, Paper, Typography } from '@material-ui/core';

import { useStyles } from './WithdrawStepsStyles';
import { t } from 'modules/i18n/utils/intl';
import { Stepper } from './Stepper';
import { StepperTitle } from './StepperTitle';
import { StepperNotice } from './StepperNotice';
import { WithdrawStep } from 'domains/account/actions/withdraw/const';
import { WithdrawForm } from './WithdrawForm';
import { TransactionButton } from 'domains/account/screens/TopUp/components/TopUpSteps/TransactionButton';
import { IWithdrawStepsProps } from './WithdrawStepsTypes';
import { LoadingButton } from 'domains/account/screens/TopUp/components/TopUpSteps/LoadingButton/LoadingButton';
import { getButtonText } from './WithdrawUtils';

export const WithdrawSteps = ({
  step,
  onConfirm,
  loading,
  withdrawalTransactionHash,
  hasError,
}: IWithdrawStepsProps) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Paper
        variant="elevation"
        className={classes.paper}
        elevation={0}
        style={{
          height: step === WithdrawStep.withdraw ? 486 : 'auto',
        }}
      >
        <Box className={classes.content}>
          <Typography
            variant="h4"
            className={hasError ? classes.error : classes.header}
          >
            {t('withdraw-steps.title')}
          </Typography>
          <Stepper
            step={step}
            className={classes.stepper}
            hasError={hasError}
          />
          <StepperTitle
            step={step}
            className={classes.title}
            hasError={hasError}
          />
          <StepperNotice
            step={step}
            className={classes.notice}
            hasError={hasError}
          />
        </Box>
        {step === WithdrawStep.withdraw && (
          <WithdrawForm onClick={onConfirm} step={step} />
        )}
        {step === WithdrawStep.waitTransactionConfirming && (
          <TransactionButton transactionHash={withdrawalTransactionHash} />
        )}
        {step === WithdrawStep.done && (
          <TransactionButton transactionHash={withdrawalTransactionHash} />
        )}
        {step !== WithdrawStep.withdraw && (
          <LoadingButton
            className={classes.button}
            isDisabled={loading}
            onClick={onConfirm}
            loading={loading}
          >
            {getButtonText(loading, step, hasError)}
          </LoadingButton>
        )}
      </Paper>
    </Container>
  );
};
