import { Button, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import { DEFAULT_FIXED, ZERO } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import { ReactText, useCallback } from 'react';
import { Field } from 'react-final-form';
import { AmountField } from '../../../../uiKit/AmountField';
import { useAmountFieldStyles } from './useAmountFieldStyles';

const MIN_AMOUNT = 0;

interface IAmountInputProps {
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

export const AmountInput = ({
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
}: IAmountInputProps) => {
  const classes = useAmountFieldStyles();
  const withBalance = !!balance;
  const maxAmount = balance || ZERO;
  const roundedBalance = balance
    ? balance.decimalPlaces(DEFAULT_FIXED, BigNumber.ROUND_DOWN).toFormat()
    : '0';
  const isMaxBtnShowed = withBalance && typeof onMaxClick === 'function';

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

  return (
    <>
      {showBalance && (withBalance || isBalanceLoading) && (
        <Typography
          variant="body2"
          className={classes.balance}
          color="textSecondary"
          component="div"
        >
          {t('stake.balance-label')}:{' '}
          {isBalanceLoading ? (
            <div className={classes.balanceLoadingBox}>
              <Skeleton width={40} />
            </div>
          ) : (
            `${roundedBalance} ${tokenName}`
          )}
        </Typography>
      )}

      <Field
        component={AmountField}
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
          endAdornment: isMaxBtnShowed && (
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
