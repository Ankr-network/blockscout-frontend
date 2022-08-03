import { Button, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { Field } from 'react-final-form';

import { t } from 'common';

import { DEFAULT_FIXED } from 'modules/common/const';
import { useValidateAmount } from 'modules/common/hooks/useValidateAmount';
import { AmountField } from 'uiKit/AmountField';

import { useAmountFieldStyles } from './useAmountFieldStyles';

const MIN_AMOUNT = 0;

interface IAmountInputProps {
  balance?: BigNumber;
  balanceLabel?: string;
  isBalanceLoading?: boolean;
  isIntegerOnly?: boolean;
  disabled?: boolean;
  label: ReactNode;
  name?: string;
  tokenName?: string;
  inputClassName?: string;
  minAmount?: number;
  maxAmount?: BigNumber;
  showBalance?: boolean;
  maxDecimals?: number;
  isLongBalance?: boolean;
  balanceLinkSlot?: ReactNode;
  onMaxClick?: () => void;
}

export const AmountInput = ({
  balance,
  balanceLabel,
  maxAmount = balance,
  isBalanceLoading = false,
  isIntegerOnly = false,
  disabled = false,
  name = 'amount',
  tokenName = 'ETH',
  label,
  inputClassName,
  minAmount = MIN_AMOUNT,
  showBalance = true,
  maxDecimals,
  balanceLinkSlot,
  isLongBalance = false,
  onMaxClick,
}: IAmountInputProps): JSX.Element => {
  const classes = useAmountFieldStyles();
  const withBalance = !!balance;
  const roundedBalance = balance
    ? balance.decimalPlaces(DEFAULT_FIXED, BigNumber.ROUND_DOWN).toFormat()
    : '0';
  const isDisabledAmountField = disabled || isBalanceLoading;
  const isMaxBtnShowed = withBalance && typeof onMaxClick === 'function';

  const validateAmount = useValidateAmount(
    balance,
    maxAmount,
    minAmount ? new BigNumber(minAmount) : undefined,
  );

  return (
    <>
      {showBalance && (withBalance || isBalanceLoading) && (
        <Typography
          className={classNames(
            classes.balance,
            isLongBalance ? classes.longBalance : classes.shortBalance,
          )}
          color="textSecondary"
          component="div"
          variant="body2"
        >
          {balanceLabel || t('stake.balance-label')}

          <>{': '}</>

          {isBalanceLoading ? (
            <div className={classes.balanceLoadingBox}>
              <Skeleton width={40} />
            </div>
          ) : (
            t('unit.token-value', {
              token: tokenName,
              value: roundedBalance,
            })
          )}

          {balanceLinkSlot}
        </Typography>
      )}

      <Field
        fullWidth
        component={AmountField}
        disabled={isDisabledAmountField}
        InputProps={{
          classes: {
            input: inputClassName,
          },
          endAdornment: isMaxBtnShowed && (
            <Button
              disabled={isDisabledAmountField}
              size="small"
              variant="outlined"
              onClick={onMaxClick}
            >
              {t('stake.btn-max')}
            </Button>
          ),
        }}
        isIntegerOnly={isIntegerOnly}
        label={label}
        maxDecimalsLen={maxDecimals}
        name={name}
        placeholder="0"
        validate={validateAmount}
        variant="outlined"
      />
    </>
  );
};
