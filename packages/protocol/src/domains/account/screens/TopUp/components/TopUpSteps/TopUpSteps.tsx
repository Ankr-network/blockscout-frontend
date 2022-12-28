import { Box, Container, Paper, Typography } from '@material-ui/core';

import { Buttons } from './Buttons';
import { ITopUpStepsProps } from './TopUpStepsTypes';
import { Stepper } from './Stepper';
import { StepperNotice } from './StepperNotice';
import { StepperTitle } from './StepperTitle';
import { TopUpStep } from 'domains/account/actions/topUp/const';
import { TransactionButton } from './TransactionButton';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './TopUpStepsStyles';

export const TopUpSteps = ({
  amount,
  hasPrivateAccess,
  hasError,
  isRejectAllowanceLoading,
  loading,
  loadingWaitTransactionConfirming,
  onConfirm,
  onReject,
  step,
  transactionHash,
  walletMeta,
}: ITopUpStepsProps) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Paper variant="elevation" className={classes.paper} elevation={0}>
        <Box className={classes.content}>
          <Typography
            variant="h4"
            className={hasError ? classes.error : classes.header}
          >
            {t('top-up-steps.title')}
          </Typography>
          <Stepper
            step={step}
            className={classes.stepper}
            hasPrivateAccess={hasPrivateAccess}
            hasError={hasError}
          />
          <StepperTitle
            step={step}
            className={classes.title}
            amount={amount}
            hasError={hasError}
            walletMeta={walletMeta}
          />
          <StepperNotice
            step={step}
            className={classes.notice}
            hasError={hasError}
          />
          {step === TopUpStep.waitTransactionConfirming && (
            <TransactionButton transactionHash={transactionHash} />
          )}
        </Box>
        <Buttons
          hasPrivateAccess={hasPrivateAccess}
          hasError={hasError}
          isRejectAllowanceLoading={isRejectAllowanceLoading}
          loading={loading}
          loadingWaitTransactionConfirming={loadingWaitTransactionConfirming}
          onConfirm={onConfirm}
          onReject={onReject}
          step={step}
        />
      </Paper>
    </Container>
  );
};
