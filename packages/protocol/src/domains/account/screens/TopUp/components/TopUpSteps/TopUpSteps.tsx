import React from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import { useStyles } from './TopUpStepsStyles';
import { t } from 'modules/i18n/utils/intl';
import { Stepper } from './Stepper';
import { StepperTitle } from './StepperTitle';
import { StepperNotice } from './StepperNotice';
import { ITopUpStepsProps } from './TopUpStepsTypes';
import { getButtonText } from './TopUpStepsUtils';
import { TopUpStep } from 'domains/account/actions/topUp/const';
import { TransactionButton } from './TransactionButton';

export const TopUpSteps = ({
  step,
  onClick,
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

        <Box className={classes.buttons}>
          <Button
            className={classes.button}
            disabled={loading || isRejectAllowanceLoading}
            onClick={onClick}
            startIcon={
              loading ? <CircularProgress size={18} color="inherit" /> : null
            }
          >
            {getButtonText(loading, step, hasCredentials)}
          </Button>
          {step === TopUpStep.deposit && (
            <Button
              fullWidth
              disabled={loading || isRejectAllowanceLoading}
              onClick={onReject}
              variant="outlined"
              startIcon={
                isRejectAllowanceLoading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : null
              }
            >
              {t(`top-up-steps.button.reject`)}
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};
