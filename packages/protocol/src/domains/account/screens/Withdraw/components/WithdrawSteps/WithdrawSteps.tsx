import React from 'react';
import { Button, Container, Paper, Typography } from '@material-ui/core';

import { useStyles } from './WithdrawStepsStyles';
import { t } from 'modules/i18n/utils/intl';
import { Stepper } from './Stepper';
import { StepperTitle } from './StepperTitle';
import { StepperNotice } from './StepperNotice';
import { WaitConfirmationBlock } from './WaitConfirmationBlock';
import { WithdrawStep } from 'domains/auth/actions/fetchWithdrawStatus';
import { WithdrawForm } from './WithdrawForm';

interface IWithdrawStepsProps {
  step: WithdrawStep;
  onClick?: () => void;
  disabled?: boolean;
}

export const WithdrawSteps = ({
  step,
  onClick,
  disabled,
}: IWithdrawStepsProps) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Paper variant="elevation" className={classes.paper} elevation={0}>
        <Typography variant="h4" color="primary">
          {t('withdraw-steps.title')}
        </Typography>
        <Stepper step={step} className={classes.stepper} />
        <StepperTitle step={step} className={classes.title} />
        <StepperNotice step={step} className={classes.notice} />
        {step === WithdrawStep.amount && <WithdrawForm onClick={onClick} />}
        {step === WithdrawStep.waitTransactionConfirming && (
          <WaitConfirmationBlock />
        )}
        {step !== WithdrawStep.amount && (
          <Button
            fullWidth
            disabled={disabled}
            onClick={onClick}
            className={classes.button}
          >
            {t('withdraw-steps.next')}
          </Button>
        )}
      </Paper>
    </Container>
  );
};
