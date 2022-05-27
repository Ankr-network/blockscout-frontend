import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  LinearProgress,
  Paper,
  Typography,
} from '@material-ui/core';
import { Query } from '@redux-requests/react';
import { CONFIRMATION_BLOCKS } from 'multirpc-sdk';

import { useStyles } from './useStyles';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { DepositStep } from 'modules/auth/actions/fetchDepositStatus';
import { fetchCredentialsStatus } from 'modules/auth/actions/fetchCredentialsStatus';
import MetamaskIcon from './assets/metamask.svg';
import { Stepper } from './Stepper';
import { useOnMount } from 'modules/common/hooks/useOnMount';

const CREATE_ACCOUNT_BLOCKS_COUNT = CONFIRMATION_BLOCKS;

interface IDepositStepsProps {
  step: DepositStep;
  onDeposit: () => void;
  onConnect: () => void;
  loading: boolean;
}

export const DepositSteps = ({
  step: outerStep,
  onDeposit,
  onConnect,
  loading,
}: IDepositStepsProps) => {
  const classes = useStyles();
  const [step, setStep] = useState<DepositStep>(outerStep);

  useEffect(() => {
    setStep(outerStep);
  }, [outerStep]);

  useOnMount(() => {
    if (step !== DepositStep.start && !loading) {
      onDeposit();
    }
  });

  return (
    <Container className={classes.root}>
      <Paper variant="elevation" className={classes.paper} elevation={0}>
        <Typography variant="h4" color="primary">
          {t('deposit-steps.title')}
        </Typography>
        <Stepper step={step} className={classes.stepper} />
        <Typography
          variant={step === DepositStep.start ? 'body1' : 'h3'}
          className={classes.content}
        >
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
          {step !== DepositStep.start &&
            tHTML(`deposit-steps.step-notice.${step}`)}
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
          {step === DepositStep.start && (
            <Button
              fullWidth
              onClick={() => {
                setStep(DepositStep.publicKey);
                onDeposit();
              }}
            >
              {t('deposit-steps.next')}
            </Button>
          )}
          {![
            DepositStep.waitTransactionConfirming,
            DepositStep.login,
            DepositStep.start,
          ].includes(step) && (
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
    </Container>
  );
};
