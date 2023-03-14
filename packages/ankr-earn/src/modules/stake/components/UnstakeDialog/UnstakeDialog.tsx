import { t } from '@ankr.com/common';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { FormApi } from 'final-form';
import {
  ReactNode,
  ReactText,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import { InputField } from 'uiKit/InputField';
import { OnChange } from 'uiKit/OnChange';

import { useUnstakeDialogStyles } from './useUnstakeDialogStyles';

enum FieldsNames {
  amount = 'amount',
  isToExternalAddress = 'isToExternalAddress',
  externalAddress = 'externalAddress',
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
  maxAmountDecimals?: number;
  maxAmount?: BigNumber;
  networkTitleSlot?: JSX.Element;
  renderFormFooter?: (amount: BigNumber, maxAmount: BigNumber) => ReactNode;
  renderFormApproveButtons?: (amount: BigNumber) => ReactNode;
  onClose?: () => void;
  onSubmit: (values: IUnstakeFormValues) => void;
  extraValidation?: (
    data: Partial<IUnstakeFormValues>,
    errors: FormErrors<IUnstakeFormValues>,
    maxAmount?: BigNumber,
  ) => FormErrors<IUnstakeFormValues>;
  onChange?: (values: IUnstakeFormValues, invalid: boolean) => void;
  isExternalAllowed?: boolean;
  allowance?: BigNumber;
  isApproveLoading?: boolean;
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
  maxAmountDecimals,
  networkTitleSlot,
  isExternalAllowed,
  maxAmount,
  onSubmit,
  onClose,
  extraValidation,
  renderFormFooter,
  onChange,
  renderFormApproveButtons,
  allowance = ZERO,
  isApproveLoading = false,
}: IUnstakeDialogProps): JSX.Element => {
  const classes = useUnstakeDialogStyles();
  const maxAmountValue = maxAmount
    ? BigNumber.minimum(maxAmount, balance)
    : balance;
  const formRef =
    useRef<FormApi<IUnstakeFormValues, Partial<IUnstakeFormValues>>>();

  const [amount, setAmount] = useState(ZERO);

  const isApproved = allowance?.isLessThanOrEqualTo(amount);

  const setMaxAmount = useCallback(
    (form: FormApi<IUnstakeFormValues>, max: string) => () =>
      form.change(FieldsNames.amount, max),
    [],
  );

  const validate = useCallback(
    (data: IUnstakeFormValues) => {
      const errors: FormErrors<IUnstakeFormValues> = {};

      return extraValidation
        ? extraValidation(data, errors, maxAmount)
        : errors;
    },
    [extraValidation, maxAmount],
  );

  const tokenName = getTokenName(token);

  const balanceValue = balance?.toString();

  useEffect(() => {
    if (balanceValue) {
      formRef.current?.reset();
    }
  }, [balanceValue]);

  return (
    <>
      <Paper className={classes.root}>
        <Form
          render={({ handleSubmit, form, values, invalid }) => {
            formRef.current = form;

            const isUnstakeBtnDisabled =
              isDisabled || submitDisabled || !isApproved || isApproveLoading;

            return (
              <form autoComplete="off" onSubmit={handleSubmit}>
                <Container className={classes.container}>
                  <Typography className={classes.title} variant="h3">
                    {t('unstake-dialog.title', { token: tokenName })}
                  </Typography>

                  {networkTitleSlot && (
                    <div className={classes.networkTitle}>
                      {networkTitleSlot}
                    </div>
                  )}

                  <Box mb={4}>
                    <AmountInput
                      balance={balance}
                      disabled={isDisabled}
                      isBalanceLoading={isBalanceLoading}
                      label={
                        <div className={classes.amountLabel}>
                          {t('unstake-dialog.amount')}
                        </div>
                      }
                      maxDecimals={maxAmountDecimals}
                      name={FieldsNames.amount}
                      tokenName={tokenName}
                      onMaxClick={setMaxAmount(
                        form,
                        maxAmountValue?.toFixed(maxAmountValue?.dp()),
                      )}
                    />
                  </Box>

                  {renderFormFooter &&
                    renderFormFooter(amount, new BigNumber(maxAmountValue))}
                </Container>

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

                  {renderFormApproveButtons ? (
                    renderFormApproveButtons(amount)
                  ) : (
                    <Grid container spacing={3}>
                      <Grid item xs>
                        <Button
                          fullWidth
                          color="primary"
                          disabled={isUnstakeBtnDisabled}
                          isLoading={isLoading}
                          size="large"
                          type="submit"
                        >
                          <>{t('unstake-dialog.btn')}</>
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </Container>

                <OnChange name={FieldsNames.amount}>
                  {() => {
                    setAmount(new BigNumber(values[FieldsNames.amount] || '0'));
                    if (typeof onChange === 'function') {
                      onChange(values, invalid);
                    }
                  }}
                </OnChange>
              </form>
            );
          }}
          validate={validate}
          onSubmit={onSubmit}
        />

        <CloseButton href={closeHref ?? ''} onClose={onClose} />
      </Paper>
    </>
  );
};
