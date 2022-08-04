import { Box, Container, Paper, Typography } from '@material-ui/core';

import { WithdrawStep } from 'domains/account/actions/withdraw/const';
import { TransactionButton } from 'domains/account/screens/TopUp/components/TopUpSteps/TransactionButton';
import { t } from 'modules/i18n/utils/intl';
import { LoadingButton } from 'uiKit/LoadingButton';
import { Stepper } from './Stepper';
import { StepperNotice } from './StepperNotice';
import { StepperTitle } from './StepperTitle';
import { WithdrawForm } from './WithdrawForm';
import { useStyles } from './WithdrawStepsStyles';
import { IWithdrawStepsProps } from './WithdrawStepsTypes';
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
            disabled={loading}
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
