import React from 'react';
import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import { useStyles } from './useStyles';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { DepositStep } from 'modules/auth/actions/fetchDepositStatus';
import { fetchCredentialsStatus } from 'modules/auth/actions/fetchCredentialsStatus';
import MetamaskIcon from './assets/metamask.svg';
import { Query } from '@redux-requests/react';
import { CONFIRMATION_BLOCKS } from '@ankr.com/multirpc';

const CREATE_ACCOUNT_BLOCKS_COUNT = CONFIRMATION_BLOCKS;

interface IDepositStepsProps {
  step: DepositStep;
  onDeposit: () => void;
  onConnect: () => void;
  loading: boolean;
}

export const DepositSteps = ({
  step,
  onDeposit,
  onConnect,
  loading,
}: IDepositStepsProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper variant="elevation" className={classes.paper} elevation={0}>
        <Typography variant="h4" color="primary">
          {t('deposit-steps.title')}
        </Typography>
        <Stepper activeStep={step} nonLinear className={classes.stepper}>
          <Step
            key={DepositStep.publicKey}
            completed={step >= DepositStep.publicKey}
          >
            <StepLabel />
          </Step>
          <Step
            key={DepositStep.allowance}
            completed={step >= DepositStep.allowance}
          >
            <StepLabel />
          </Step>
          <Step
            key={DepositStep.deposit}
            completed={step >= DepositStep.deposit}
          >
            <StepLabel />
          </Step>
          <Step
            key={DepositStep.waitTransactionConfirming}
            completed={step >= DepositStep.waitTransactionConfirming}
          >
            <StepLabel />
          </Step>
          <Step key={DepositStep.login} completed={step >= DepositStep.login}>
            <StepLabel />
          </Step>
        </Stepper>
        <Typography variant="h3" className={classes.content}>
          {tHTML(`deposit-steps.step-content.${step}`, {
            src: MetamaskIcon,
            alt: t('deposit-steps.metamask'),
          })}
        </Typography>
        <Typography
          variant="h4"
          color="textSecondary"
          className={classes.notice}
        >
          {tHTML(`deposit-steps.step-notice.${step}`)}
        </Typography>
        {step === DepositStep.waitTransactionConfirming && (
          <Query
            type={fetchCredentialsStatus.toString()}
            action={fetchCredentialsStatus}
            showLoaderDuringRefetch={false}
          >
            {({ data }) => {
              if (
                data?.isReady ||
                typeof data.remainingBlocks === 'undefined'
              ) {
                return null;
              }

              return (
                <Box mt={3} mb={4}>
                  <LinearProgress
                    variant="determinate"
                    value={
                      data.remainingBlocks === CREATE_ACCOUNT_BLOCKS_COUNT
                        ? 4
                        : ((CREATE_ACCOUNT_BLOCKS_COUNT -
                            data.remainingBlocks) /
                            CREATE_ACCOUNT_BLOCKS_COUNT) *
                          100
                    }
                  />
                </Box>
              );
            }}
          </Query>
        )}

        <Box maxWidth={210} width="100%">
          {step !== DepositStep.waitTransactionConfirming &&
            step !== DepositStep.login && (
              <Button fullWidth disabled={loading} onClick={onDeposit}>
                {t('deposit-steps.next')}
              </Button>
            )}
          {step === DepositStep.login && (
            <Button fullWidth disabled={loading} onClick={onConnect}>
              {t('deposit-steps.next')}
            </Button>
          )}
        </Box>
      </Paper>
    </div>
  );
};
