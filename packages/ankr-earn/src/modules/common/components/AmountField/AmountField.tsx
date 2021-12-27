import { Button, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { DEFAULT_FIXED } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import { ReactText, useCallback } from 'react';
import { Field } from 'react-final-form';
import { InputField } from 'uiKit/InputField';
import { QueryLoading } from 'uiKit/QueryLoading';
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
  minAmount?: number;
  showBalance?: boolean;
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
  minAmount = MIN_AMOUNT,
  showBalance = true,
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
          error = t('validation.number-only');
        } else if (
          currentAmount.isLessThan(minAmount) ||
          currentAmount.isEqualTo(MIN_AMOUNT)
        ) {
          error = t('validation.min', {
            value: minAmount,
          });
        } else if (isTooBigAmount || isZeroBalance) {
          error = t('validation.low-balance');
        }
      }

      return error;
    },
    [balance, maxAmount, minAmount, withBalance],
  );

  const normalizeAmount = (value: string): string => {
    // only numbers and dot
    return value.replace(',', '.').replace(/[^0-9.]/g, '');
  };

  return (
    <>
      {showBalance && (withBalance || isBalanceLoading) && (
        <Typography
          variant="body2"
          className={classes.balance}
          color="textSecondary"
        >
          {t('stake.balance-label')}:{' '}
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
        parse={normalizeAmount}
        InputProps={{
          classes: {
            input: inputClassName,
          },
          endAdornment: withBalance && (
            <Button
              className={classes.maxBtn}
              variant="outlined"
              size="small"
              onClick={onMaxClick}
              disabled={disabled}
            >
              {t('stake.btn-max')}
            </Button>
          ),
        }}
        fullWidth
      />
    </>
  );
};
