import React from 'react';
import { Box, Button, Container, Paper, Typography } from '@material-ui/core';

import { useStyles } from './TopUpStepsStyles';
import { t } from 'modules/i18n/utils/intl';
import { Stepper } from './Stepper';
import { TopUpStep } from 'modules/auth/actions/fetchTopUpStatus';
import { StepperTitle } from './StepperTitle';
import { StepperNotice } from './StepperNotice';

import { WaitConfirmationBlock } from './WaitConfirmationBlock';

interface ITopUpStepsProps {
  step: TopUpStep;
  onClick?: () => void;
  disabled?: boolean;
  amount?: number;
}

export const TopUpSteps = ({
  step,
  onClick,
  disabled,
  amount,
}: ITopUpStepsProps) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Paper variant="elevation" className={classes.paper} elevation={0}>
        <Typography variant="h4" color="primary">
          {t('top-up-steps.title')}
        </Typography>
        <Stepper step={step} className={classes.stepper} />
        <StepperTitle step={step} className={classes.title} amount={amount} />
        <StepperNotice step={step} className={classes.notice} />
        {step === TopUpStep.waitTransactionConfirming && (
          <WaitConfirmationBlock />
        )}
        <Box maxWidth={210} width="100%">
          <Button fullWidth disabled={disabled} onClick={onClick}>
            {t('top-up-steps.next')}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
