import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { FormApi } from 'final-form';
import { ReactNode, ReactText, useCallback, useEffect, useRef } from 'react';
import { Form } from 'react-final-form';

import { Notice } from 'ui';

import { AmountInput } from 'modules/common/components/AmountField';
import { Timer } from 'modules/common/components/Timer';
import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'uiKit/Button';
import { CloseButton } from 'uiKit/CloseButton';
import { OnChange } from 'uiKit/OnChange';

import { useUnstakeDialogStyles } from './useUnstakeDialogStyles';

const UNSTAKE_FORM_ID = 'unstake-form';

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
      <Container className={classes.container}>
        <Typography className={classes.title} variant="h3">
          {t('unstake-dialog.title', { token })}
        </Typography>

        <Form
          render={({ handleSubmit, form, values, invalid }) => {
            formRef.current = form;
            return (
              <form
                autoComplete="off"
                id={UNSTAKE_FORM_ID}
                onSubmit={handleSubmit}
              >
                <Box mb={4}>
                  <AmountInput
                    balance={balance}
                    inputClassName={classes.input}
                    isBalanceLoading={isBalanceLoading}
                    label={t('unstake-dialog.amount')}
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
      </Container>

      <div className={classes.footer}>
        <Container className={classes.container}>
          <Grid container direction="column" spacing={4}>
            <Grid item xs>
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
            </Grid>

            <Grid item xs>
              <Button
                fullWidth
                color="primary"
                disabled={submitDisabled}
                form={UNSTAKE_FORM_ID}
                isLoading={isLoading}
                size="large"
                type="submit"
              >
                {t('unstake-dialog.btn')}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>

      <CloseButton href={closeHref ?? ''} onClose={onClose} />
    </Paper>
  );
};
