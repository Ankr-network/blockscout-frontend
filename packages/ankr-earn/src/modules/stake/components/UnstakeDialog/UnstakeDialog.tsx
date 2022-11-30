import { t, tHTML } from '@ankr.com/common';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { FormApi } from 'final-form';
import { ReactNode, ReactText, useCallback, useEffect, useRef } from 'react';
import { Field, Form } from 'react-final-form';

import { Notice } from 'ui';

import { AmountInput } from 'modules/common/components/AmountField';
import { Timer } from 'modules/common/components/Timer';
import { ZERO } from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { getTokenName } from 'modules/common/utils/getTokenName';
import { Button } from 'uiKit/Button';
import { CheckboxField } from 'uiKit/CheckboxField';
import { CloseButton } from 'uiKit/CloseButton';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { InputField } from 'uiKit/InputField';
import { OnChange } from 'uiKit/OnChange';
import { NumericStepper } from 'uiKit/Stepper';
import { Tooltip } from 'uiKit/Tooltip';

import { useUnstakeDialogStyles } from './useUnstakeDialogStyles';

enum FieldsNames {
  amount = 'amount',
  isToExternalAddress = 'isToExternalAddress',
  externalAddress = 'externalAddress',
}

enum ESteps {
  approve,
  unstake,
}

export interface IUnstakeFormValues {
  amount?: ReactText;
  isToExternalAddress?: boolean;
  externalAddress?: string;
}

export interface IUnstakeDialogProps {
  balance?: BigNumber;
  isLoading?: boolean;
  submitDisabled?: boolean;
  isBalanceLoading?: boolean;
  isDisabled?: boolean;
  endText?: string;
  endDate?: Date;
  token?: Token;
  closeHref?: string;
  isApproved?: boolean;
  isWithApprove?: boolean;
  isApproveLoading?: boolean;
  maxAmountDecimals?: number;
  maxAmount?: BigNumber;
  networkTitleSlot?: JSX.Element;
  renderFormFooter?: (amount: BigNumber, maxAmount: BigNumber) => ReactNode;
  onClose?: () => void;
  onSubmit: (values: IUnstakeFormValues) => void;
  extraValidation?: (
    data: Partial<IUnstakeFormValues>,
    errors: FormErrors<IUnstakeFormValues>,
    maxAmount?: BigNumber,
  ) => FormErrors<IUnstakeFormValues>;
  onChange?: (values: IUnstakeFormValues, invalid: boolean) => void;
  isExternalAllowed?: boolean;
}

export const UnstakeDialog = ({
  isBalanceLoading,
  isDisabled,
  isLoading,
  submitDisabled,
  balance = ZERO,
  closeHref,
  endDate,
  endText,
  token = Token.AVAX,
  isApproved,
  isWithApprove,
  isApproveLoading,
  maxAmountDecimals,
  networkTitleSlot,
  onSubmit,
  onClose,
  extraValidation,
  renderFormFooter,
  onChange,
  isExternalAllowed,
  maxAmount,
}: IUnstakeDialogProps): JSX.Element => {
  const classes = useUnstakeDialogStyles();
  const maxAmountValue = maxAmount
    ? BigNumber.minimum(maxAmount, balance)
    : balance;
  const formRef =
    useRef<FormApi<IUnstakeFormValues, Partial<IUnstakeFormValues>>>();

  const setMaxAmount = useCallback(
    (form: FormApi<IUnstakeFormValues>, max: string) => () =>
      form.change(FieldsNames.amount, max),
    [],
  );

  const activeStep = isApproved ? ESteps.unstake : ESteps.approve;

  const isUnstakeBtnDisabled =
    isDisabled || submitDisabled || (isWithApprove && !isApproved);

  const validate = useCallback(
    (data: IUnstakeFormValues) => {
      const errors: FormErrors<IUnstakeFormValues> = {};

      return extraValidation
        ? extraValidation(data, errors, maxAmount)
        : errors;
    },
    [extraValidation, maxAmount],
  );

  useEffect(() => {
    const shouldResetTheForm = !!balance;
    if (shouldResetTheForm) {
      formRef.current?.reset();
    }
  }, [balance]);

  const tokenName = getTokenName(token);

  return (
    <Paper className={classes.root}>
      <Form
        render={({ handleSubmit, form, values, invalid }) => {
          formRef.current = form;
          return (
            <form autoComplete="off" onSubmit={handleSubmit}>
              <Container className={classes.container}>
                <Typography className={classes.title} variant="h3">
                  {t('unstake-dialog.title', { token: tokenName })}
                </Typography>

                {networkTitleSlot && (
                  <div className={classes.networkTitle}>{networkTitleSlot}</div>
                )}

                <Box mb={4}>
                  <AmountInput
                    balance={balance}
                    disabled={isDisabled || isApproved}
                    isBalanceLoading={isBalanceLoading}
                    label={t('unstake-dialog.amount')}
                    maxDecimals={maxAmountDecimals}
                    name={FieldsNames.amount}
                    tokenName={tokenName}
                    onMaxClick={setMaxAmount(form, maxAmountValue.toFormat())}
                  />
                </Box>

                {renderFormFooter &&
                  renderFormFooter(
                    new BigNumber(values.amount ?? 0),
                    new BigNumber(maxAmountValue),
                  )}
              </Container>

              <div>
                <Container className={classes.container}>
                  {isExternalAllowed && (
                    <div className={classes.externalWrapper}>
                      <div className={classes.checkboxArea}>
                        <Field
                          component={CheckboxField}
                          name={FieldsNames.isToExternalAddress}
                          type="checkbox"
                        >
                          <Typography
                            className={classes.checkboxTxt}
                            color="textSecondary"
                            variant="body2"
                          >
                            {t('unstake-dialog.send-external-wallet')}
                          </Typography>
                        </Field>
                      </div>

                      {values.isToExternalAddress && (
                        <div className={classes.addressArea}>
                          <Typography
                            className={classes.labelTxt}
                            color="textPrimary"
                            variant="body2"
                          >
                            {t('stake-polkadot.unstake.external-wallet')}
                          </Typography>

                          <Field
                            fullWidth
                            className={classes.addressField}
                            component={InputField}
                            disabled={isDisabled}
                            name={FieldsNames.externalAddress}
                            type="string"
                          />
                        </div>
                      )}
                    </div>
                  )}

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
                          disabled={
                            isDisabled || isApproved || isApproveLoading
                          }
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
