import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { FormApi } from 'final-form';
import { ReactNode, ReactText, useCallback, useEffect, useRef } from 'react';
import { Form } from 'react-final-form';

import { t, tHTML } from 'common';
import { Notice } from 'ui';

import { AmountInput } from 'modules/common/components/AmountField';
import { Timer } from 'modules/common/components/Timer';
import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { Button } from 'uiKit/Button';
import { CloseButton } from 'uiKit/CloseButton';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { OnChange } from 'uiKit/OnChange';
import { NumericStepper } from 'uiKit/Stepper';
import { Tooltip } from 'uiKit/Tooltip';

import { useUnstakeDialogStyles } from './useUnstakeDialogStyles';

enum FieldsNames {
  amount = 'amount',
}

export interface IUnstakeFormValues {
  amount?: ReactText;
}

export interface IUnstakeDialogProps {
  balance?: BigNumber;
  isLoading?: boolean;
  submitDisabled?: boolean;
  isBalanceLoading?: boolean;
  endText?: string;
  endDate?: Date;
  token?: Token;
  closeHref?: string;
  isApproved?: boolean;
  isWithApprove?: boolean;
  isApproveLoading?: boolean;
  maxAmountDecimals?: number;
  renderFormFooter?: (amount: BigNumber, maxAmount: BigNumber) => ReactNode;
  onClose?: () => void;
  onSubmit: (values: IUnstakeFormValues) => void;
  extraValidation?: (
    data: Partial<IUnstakeFormValues>,
    errors: FormErrors<IUnstakeFormValues>,
  ) => FormErrors<IUnstakeFormValues>;
  onChange?: (values: IUnstakeFormValues, invalid: boolean) => void;
}

export const UnstakeDialog = ({
  isBalanceLoading,
  isLoading,
  submitDisabled,
  balance,
  closeHref,
  endDate,
  endText,
  token = Token.AVAX,
  isApproved,
  isWithApprove,
  isApproveLoading,
  maxAmountDecimals,
  onSubmit,
  onClose,
  extraValidation,
  renderFormFooter,
  onChange,
}: IUnstakeDialogProps): JSX.Element => {
  const classes = useUnstakeDialogStyles();
  const zeroBalance = new BigNumber(0);
  const maxAmount = balance || zeroBalance;
  const formRef =
    useRef<FormApi<IUnstakeFormValues, Partial<IUnstakeFormValues>>>();

  const setMaxAmount = useCallback(
    (form: FormApi<IUnstakeFormValues>, max: string) => () =>
      form.change(FieldsNames.amount, max),
    [],
  );

  const activeStep = isApproved ? 1 : 0;

  const isUnstakeBtnDisabled = submitDisabled || (isWithApprove && !isApproved);

  const validate = useCallback(
    (data: IUnstakeFormValues) => {
      const errors: FormErrors<IUnstakeFormValues> = {};

      return extraValidation ? extraValidation(data, errors) : errors;
    },
    [extraValidation],
  );

  useEffect(() => {
    const shouldResetTheForm = !!balance;
    if (shouldResetTheForm) {
      formRef.current?.reset();
    }
  }, [balance]);

  return (
    <Paper className={classes.root}>
      <Form
        render={({ handleSubmit, form, values, invalid }) => {
          formRef.current = form;
          return (
            <form autoComplete="off" onSubmit={handleSubmit}>
              <Container className={classes.container}>
                <Typography className={classes.title} variant="h3">
                  {t('unstake-dialog.title', { token })}
                </Typography>

                <Box mb={4}>
                  <AmountInput
                    balance={balance}
                    disabled={isApproved}
                    isBalanceLoading={isBalanceLoading}
                    label={t('unstake-dialog.amount')}
                    maxDecimals={maxAmountDecimals}
                    name={FieldsNames.amount}
                    tokenName={token}
                    onMaxClick={setMaxAmount(form, maxAmount.toFormat())}
                  />
                </Box>

                {renderFormFooter &&
                  renderFormFooter(
                    new BigNumber(values.amount ?? 0),
                    new BigNumber(maxAmount),
                  )}
              </Container>

              <div className={classes.footer}>
                <Container className={classes.container}>
                  <Box mb={4}>
                    {endDate && (
                      <Typography className={classes.info} variant="body2">
                        {t('unstake-dialog.info', { token })}

                        <Timer
                          className={classes.timer}
                          component="span"
                          endTime={endDate}
                        />
                      </Typography>
                    )}

                    {endText && <Notice>{endText}</Notice>}
                  </Box>

                  <Grid container spacing={3}>
                    {isWithApprove && (
                      <Grid item xs>
                        <Button
                          fullWidth
                          color="primary"
                          disabled={isApproved || isApproveLoading}
                          endIcon={
                            <Tooltip
                              arrow
                              title={tHTML('common.tooltips.allowance')}
                            >
                              <Box component="span" display="flex">
                                <QuestionIcon htmlColor="inherit" size="xs" />
                              </Box>
                            </Tooltip>
                          }
                          isLoading={isApproveLoading}
                          size="large"
                          type="submit"
                        >
                          {t('unstake-dialog.btn-approve')}
                        </Button>
                      </Grid>
                    )}

                    <Grid item xs>
                      <Button
                        fullWidth
                        color="primary"
                        disabled={isUnstakeBtnDisabled}
                        isLoading={isLoading}
                        size="large"
                        type="submit"
                      >
                        {t('unstake-dialog.btn')}
                      </Button>
                    </Grid>
                  </Grid>

                  {isWithApprove && (
                    <NumericStepper
                      activeStep={activeStep}
                      className={classes.stepper}
                      stepsCount={2}
                    />
                  )}
                </Container>
              </div>

              {typeof onChange === 'function' && (
                <OnChange name={FieldsNames.amount}>
                  {() => {
                    onChange(values, invalid);
                  }}
                </OnChange>
              )}
            </form>
          );
        }}
        validate={validate}
        onSubmit={onSubmit}
      />

      <CloseButton href={closeHref ?? ''} onClose={onClose} />
    </Paper>
  );
};
