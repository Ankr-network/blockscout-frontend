import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { FormApi } from 'final-form';
import { AmountInput } from 'modules/common/components/AmountField';
import { Timer } from 'modules/common/components/Timer';
import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { ReactNode, ReactText, useCallback } from 'react';
import { Form } from 'react-final-form';
import { Button } from 'uiKit/Button';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';
import { NavLink } from 'uiKit/NavLink';
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
  endDate?: Date;
  endText?: string;
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
}: IUnstakeDialogProps) => {
  const classes = useUnstakeDialogStyles();
  const zeroBalance = new BigNumber(0);
  const maxAmount = balance || zeroBalance;

  const setMaxAmount = useCallback(
    (form: FormApi<IUnstakeFormValues>, maxAmount: string) => () =>
      form.change(FieldsNames.amount, maxAmount),
    [],
  );

  const validate = useCallback(
    (data: IUnstakeFormValues) => {
      const errors: FormErrors<IUnstakeFormValues> = {};

      return extraValidation ? extraValidation(data, errors) : errors;
    },
    [extraValidation],
  );

  const CloseBtn = closeHref ? NavLink : Button;

  return (
    <Paper className={classes.root}>
      <Container className={classes.container}>
        <Typography variant="h3" className={classes.title}>
          {t('unstake-dialog.title', { token })}
        </Typography>

        <Form
          validate={validate}
          onSubmit={onSubmit}
          render={({ handleSubmit, form, values, invalid }) => (
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              id={UNSTAKE_FORM_ID}
            >
              <Box mb={4}>
                <AmountInput
                  balance={balance}
                  onMaxClick={setMaxAmount(form, maxAmount.toFormat())}
                  isBalanceLoading={isBalanceLoading}
                  name={FieldsNames.amount}
                  tokenName={token}
                  label={t('unstake-dialog.amount')}
                  inputClassName={classes.input}
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
          )}
        />
      </Container>

      <div className={classes.footer}>
        <Container className={classes.container}>
          <Grid container direction="column" spacing={4}>
            <Grid item xs>
              {endDate && (
                <Typography variant="body2" className={classes.info}>
                  {t('unstake-dialog.info', { token })}

                  <Timer
                    component="span"
                    className={classes.timer}
                    endTime={endDate}
                  />
                </Typography>
              )}
              {endText && (
                <Typography variant="body2" className={classes.info}>
                  {endText}
                </Typography>
              )}
            </Grid>

            <Grid item xs>
              <Button
                type="submit"
                size="large"
                color="primary"
                form={UNSTAKE_FORM_ID}
                fullWidth
                disabled={submitDisabled}
                isLoading={isLoading}
              >
                {t('unstake-dialog.btn')}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>

      <CloseBtn
        variant="outlined"
        className={classes.closeBtn}
        onClick={onClose}
        href={closeHref ?? ''}
      >
        <CloseIcon size="xxs" htmlColor="inherit" />
      </CloseBtn>
    </Paper>
  );
};
