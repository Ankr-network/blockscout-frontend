import { Button, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import { ReactText, useCallback } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';

import { DEFAULT_FIXED, ZERO } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import { AmountField } from 'uiKit/AmountField';

import { useAmountFieldStyles } from './useAmountFieldStyles';

const MIN_AMOUNT = 0;

interface IAmountInputProps {
  balance?: BigNumber;
  isBalanceLoading?: boolean;
  isIntegerOnly?: boolean;
  disabled?: boolean;
  onMaxClick?: () => void;
  label: string;
  name?: string;
  tokenName?: string;
  inputClassName?: string;
  minAmount?: number;
  showBalance?: boolean;
}

export const AmountInput = ({
  balance,
  onMaxClick,
  isBalanceLoading = false,
  isIntegerOnly = false,
  disabled = false,
  name = 'amount',
  tokenName = 'ETH',
  label,
  inputClassName,
  minAmount = MIN_AMOUNT,
  showBalance = true,
}: IAmountInputProps): JSX.Element => {
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
          className={classes.balance}
          color="textSecondary"
          component="div"
          variant="body2"
        >
          {t('stake.balance-label')}

          <>{': '}</>
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
        fullWidth
        component={AmountField}
        disabled={disabled}
        InputProps={{
          classes: {
            input: inputClassName,
          },
          endAdornment: isMaxBtnShowed && (
            <Button
              className={classes.maxBtn}
              disabled={disabled}
              size="small"
              variant="outlined"
              onClick={onMaxClick}
            >
              {t('stake.btn-max')}
            </Button>
          ),
        }}
        label={label}
        name={name}
        placeholder="0"
        validate={validateAmount}
        variant="outlined"
      >
        {(props: FieldRenderProps<string>): JSX.Element => (
          <AmountField isIntegerOnly={isIntegerOnly} {...props} />
        )}
      </Field>
    </>
  );
};
