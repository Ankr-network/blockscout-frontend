import { Button, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import { Field } from 'react-final-form';

import { DEFAULT_FIXED } from 'modules/common/const';
import { useValidateAmount } from 'modules/common/hooks/useAmountValidation';
import { t } from 'modules/i18n/utils/intl';
import { AmountField } from 'uiKit/AmountField';

import { useAmountFieldStyles } from './useAmountFieldStyles';

const MIN_AMOUNT = 0;

interface IAmountInputProps {
  balance?: BigNumber;
  isBalanceLoading?: boolean;
  isIntegerOnly?: boolean;
  disabled?: boolean;
  label: string;
  name?: string;
  tokenName?: string;
  inputClassName?: string;
  minAmount?: number;
  maxAmount?: BigNumber;
  showBalance?: boolean;
  maxDecimals?: number;
  onMaxClick?: () => void;
}

export const AmountInput = ({
  balance,
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
  onMaxClick,
}: IAmountInputProps): JSX.Element => {
  const classes = useAmountFieldStyles();
  const withBalance = !!balance;
  const roundedBalance = balance
    ? balance.decimalPlaces(DEFAULT_FIXED, BigNumber.ROUND_HALF_DOWN).toFormat()
    : '0';
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
              disabled={disabled}
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
