import {
  Box,
  Container,
  Dialog,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { FormApi } from 'final-form';
import { ReactNode, ReactText, useCallback } from 'react';
import { Form } from 'react-final-form';
import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { AmountField } from 'modules/common/components/AmountField';
import { Button } from 'uiKit/Button';
import { Timer } from 'modules/common/components/Timer';
import { useUnstakeDialogStyles } from './useUnstakeDialogStyles';
import { CancelIcon } from 'uiKit/Icons/CancelIcon';

const UNSTAKE_FORM_ID = 'unstake-form';

export interface IUnstakeFormValues {
  amount?: ReactText;
}

interface IUnstakeDialogProps {
  renderFormFooter?: (amount: BigNumber, maxAmount: BigNumber) => ReactNode;
  isOpened?: boolean;
  balance?: BigNumber;
  isLoading?: boolean;
  submitDisabled?: boolean;
  isBalanceLoading?: boolean;
  onClose?: () => void;
  onSubmit: (values: IUnstakeFormValues) => void;
  endDate?: Date;
  endText?: string;
  token?: Token;
  extraValidation?: (
    data: Partial<IUnstakeFormValues>,
    errors: FormErrors<IUnstakeFormValues>,
  ) => FormErrors<IUnstakeFormValues>;
}

export const UnstakeDialog = ({
  renderFormFooter,
  isOpened = false,
  isBalanceLoading,
  isLoading,
  submitDisabled,
  balance,
  onClose,
  onSubmit,
  endDate,
  endText,
  token = Token.AVAX,
  extraValidation,
}: IUnstakeDialogProps) => {
  const classes = useUnstakeDialogStyles();
  const zeroBalance = new BigNumber(0);
  const maxAmount = balance || zeroBalance;

  const setMaxAmount = useCallback(
    (form: FormApi<IUnstakeFormValues>, maxAmount: string) => () =>
      form.change('amount', maxAmount),
    [],
  );

  const validate = useCallback(
    (data: IUnstakeFormValues) => {
      const errors: FormErrors<IUnstakeFormValues> = {};

      return extraValidation ? extraValidation(data, errors) : errors;
    },
    [extraValidation],
  );

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ square: false }}
      classes={{ paper: classes.root }}
      scroll="body"
    >
      <Container className={classes.container}>
        <Typography variant="h3" className={classes.title}>
          {t('unstake-dialog.title', { token })}
        </Typography>

        <Form
          validate={validate}
          onSubmit={onSubmit}
          render={({ handleSubmit, form, values }) => (
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              id={UNSTAKE_FORM_ID}
            >
              <Box mb={4}>
                <AmountField
                  balance={balance}
                  onMaxClick={setMaxAmount(form, maxAmount.toFormat())}
                  isBalanceLoading={isBalanceLoading}
                  name="amount"
                  tokenName={token}
                  label={t('stake-avax.convert-dialog.amount')}
                  inputClassName={classes.input}
                />
              </Box>

              {renderFormFooter &&
                renderFormFooter(
                  new BigNumber(values.amount ?? 0),
                  new BigNumber(maxAmount),
                )}
            </form>
          )}
        />
      </Container>

      <div className={classes.footer}>
        <Container className={classes.container}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} sm>
              {endDate && (
                <Typography variant="body2" className={classes.info}>
                  {t('unstake-dialog.info', { token })}
                  {` `}
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

            <Grid item xs sm={5}>
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

      <IconButton className={classes.closeBtn} onClick={onClose}>
        <CancelIcon size="xmd" />
      </IconButton>
    </Dialog>
  );
};
