import { Button, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactText, useCallback } from 'react';
import { Field } from 'react-final-form';
import { DEFAULT_FIXED } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import { InputField } from 'uiKit/InputField';
import { QueryLoading } from '../QueryLoading/QueryLoading';
import { useAmountFieldStyles } from './useAmountFieldStyles';

const MIN_AMOUNT = 0;

interface IAmountFieldProps {
  balance?: BigNumber;
  isBalanceLoading?: boolean;
  disabled?: boolean;
  onMaxClick?: () => void;
  name?: string;
  label?: string;
  tokenName?: string;
  inputClassName?: string;
}

export const AmountField = ({
  balance,
  onMaxClick,
  isBalanceLoading = false,
  disabled = false,
  name = 'amount',
  tokenName = 'ETH',
  label = t('stake-avax.convert-dialog.amount'),
  inputClassName,
}: IAmountFieldProps) => {
  const classes = useAmountFieldStyles();
  const withBalance = !!balance;
  const zeroBalance = new BigNumber(0);
  const maxAmount = balance || zeroBalance;
  const roundedBalance = balance
    ? balance.decimalPlaces(DEFAULT_FIXED).toFormat()
    : '0';

  const validateAmount = useCallback(
    (value?: ReactText) => {
      let error: string | undefined;

      if (!value) {
        error = t('validation.required');
      } else {
        const currentAmount = new BigNumber(value);
        const isZeroBalance = withBalance && balance?.isEqualTo(0);
        const isTooBigAmount =
          withBalance && currentAmount.isGreaterThan(maxAmount);

        if (currentAmount.isNaN()) {
          error = t('validation.numberOnly');
        } else if (currentAmount.isLessThanOrEqualTo(MIN_AMOUNT)) {
          error = t('validation.min', {
            value: MIN_AMOUNT,
          });
        } else if (isTooBigAmount || isZeroBalance) {
          error = t('validation.low-balance');
        }
      }

      return error;
    },
    [balance, maxAmount, withBalance],
  );

  return (
    <>
      {(withBalance || isBalanceLoading) && (
        <Typography
          variant="body2"
          className={classes.balance}
          color="textSecondary"
        >
          {t('cross-chain-bridge.form.balance')}:{' '}
          {isBalanceLoading ? (
            <div className={classes.balanceLoadingBox}>
              <QueryLoading size={16} />
            </div>
          ) : (
            `${roundedBalance} ${tokenName}`
          )}
        </Typography>
      )}

      <Field
        component={InputField}
        name={name}
        label={label}
        placeholder="0"
        variant="outlined"
        disabled={disabled}
        validate={validateAmount}
        InputProps={{
          classes: {
            input: inputClassName,
          },
          endAdornment: withBalance && (
            <Button
              className={classes.maxBtn}
              variant="outlined"
              size="small"
              color="secondary"
              onClick={onMaxClick}
              disabled={disabled}
            >
              {t('cross-chain-bridge.form.btn-max')}
            </Button>
          ),
        }}
        fullWidth
      />
    </>
  );
};
