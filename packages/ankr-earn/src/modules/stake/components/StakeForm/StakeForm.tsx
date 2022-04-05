import { Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { FormApi } from 'final-form';
import { ReactNode, ReactText, useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { AmountInput } from 'modules/common/components/AmountField';
import { ZERO } from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { floor } from 'modules/common/utils/floor';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'uiKit/Button';
import { OnChange } from 'uiKit/OnChange';

import { useStakeFormStyles } from './useStakeFormStyles';

const DEFAULT_MIN_AMOUNT = new BigNumber(0.1);

enum FieldsNames {
  amount = 'amount',
}

export interface IStakeFormPayload {
  amount?: ReactText;
}

export interface IStakeSubmitPayload extends IStakeFormPayload {
  amount: string;
}

export interface IStakeFormComponentProps {
  balance?: BigNumber;
  minAmount?: BigNumber;
  maxAmount?: BigNumber;
  loading?: boolean;
  isBalanceLoading?: boolean;
  isIntegerOnly?: boolean;
  isDisabled?: boolean;
  isFeeLoading?: boolean;
  fee?: BigNumber;
  tokenIn?: string;
  tokenOut?: string;
  className?: string;
  isMaxBtnShowed?: boolean;
  maxAmountDecimals?: number;
  feeSlot?: ReactNode;
  stakingAmountStep?: number;
  renderStats?: (amount: BigNumber) => ReactNode;
  renderFooter?: (amount: BigNumber) => ReactNode;
  onSubmit: (payload: IStakeSubmitPayload) => void;
  onChange?: (values: IStakeFormPayload, invalid: boolean) => void;
}

export const StakeForm = ({
  className,
  balance = ZERO,
  minAmount = DEFAULT_MIN_AMOUNT,
  maxAmount = balance,
  loading = false,
  isBalanceLoading = false,
  isIntegerOnly = false,
  isDisabled = false,
  tokenIn = t('unit.eth'),
  tokenOut = tokenIn,
  isMaxBtnShowed = true,
  maxAmountDecimals,
  feeSlot,
  fee,
  isFeeLoading,
  stakingAmountStep,
  renderStats,
  renderFooter,
  onSubmit,
  onChange,
}: IStakeFormComponentProps): JSX.Element => {
  const classes = useStakeFormStyles();

  const balanceRoundedByStep = stakingAmountStep
    ? `${floor(balance.toNumber(), stakingAmountStep)}`
    : balance.toString();

  const maxStakeAmount = balance.isLessThanOrEqualTo(maxAmount)
    ? balanceRoundedByStep
    : maxAmount.toString();

  const validateStakeForm = useCallback(
    ({ amount }: IStakeFormPayload) => {
      const errors: FormErrors<IStakeFormPayload> = {};

      const withAmountStep = !!stakingAmountStep;
      const isMultipleOf =
        amount && stakingAmountStep ? +amount % stakingAmountStep === 0 : false;

      const shouldUseFeeValidation =
        typeof isFeeLoading !== 'undefined' && !isFeeLoading;

      if (withAmountStep && !isMultipleOf) {
        errors.amount = t('validation.multiple-of', {
          value: stakingAmountStep,
        });
      }

      if (shouldUseFeeValidation) {
        const bigAmount = amount && new BigNumber(+amount);
        if (bigAmount && fee && !balance.isGreaterThan(bigAmount.plus(fee))) {
          errors.amount = t('validation.fee-plus-amount-wrong');
        }
      }

      return errors;
    },
    [stakingAmountStep, isFeeLoading, fee, balance],
  );

  const onSubmitForm = (payload: IStakeFormPayload): void =>
    onSubmit({
      ...payload,
      amount: getAmountNum(payload?.amount).toFixed(),
    } as IStakeSubmitPayload);

  const renderForm = ({
    form,
    handleSubmit,
    values,
    invalid,
  }: FormRenderProps<IStakeFormPayload>) => {
    const { amount } = values;
    const amountNumber = getAmountNum(amount);

    return (
      <Paper
        className={className}
        component="form"
        variant="elevation"
        onSubmit={handleSubmit}
      >
        <div className={classes.body}>
          <div className={classes.wrapper}>
            <Typography classes={{ root: classes.title }} variant="h2">
              {t('stake.title', {
                token: tokenIn,
              })}
            </Typography>

            <AmountInput
              balance={balance}
              disabled={isDisabled}
              isBalanceLoading={isBalanceLoading}
              isIntegerOnly={isIntegerOnly}
              label={t('stake.amount', {
                token: tokenIn,
              })}
              maxAmount={maxAmount}
              maxDecimals={maxAmountDecimals}
              minAmount={minAmount?.toNumber()}
              name={FieldsNames.amount}
              tokenName={tokenIn}
              onMaxClick={
                isMaxBtnShowed ? setMaxAmount(form, maxStakeAmount) : undefined
              }
            />

            {renderStats && renderStats(amountNumber)}

            {feeSlot}
          </div>
        </div>

        <div className={classes.footer}>
          <div className={classNames(classes.wrapper, classes.footerWrapper)}>
            {typeof renderFooter === 'function' ? (
              renderFooter(amountNumber)
            ) : (
              <Button
                className={classes.submit}
                color="primary"
                disabled={isDisabled || loading || isBalanceLoading}
                isLoading={loading}
                size="large"
                type="submit"
              >
                {t('stake.stake', {
                  token: tokenOut,
                })}
              </Button>
            )}
          </div>
        </div>

        <OnChange name={FieldsNames.amount}>
          {(value, previous) => {
            const isForceUpdateFee = !(value === '0' || value === previous);
            if (typeof onChange === 'function') {
              onChange(values, isForceUpdateFee ? false : invalid);
            }
          }}
        </OnChange>
      </Paper>
    );
  };

  return (
    <Form
      render={renderForm}
      validate={validateStakeForm}
      onSubmit={onSubmitForm}
    />
  );
};

function setMaxAmount(form: FormApi<IStakeFormPayload>, maxValue: string) {
  return () => form.change(FieldsNames.amount, maxValue);
}

function getAmountNum(amount?: ReactText): BigNumber {
  if (typeof amount === 'undefined') {
    return ZERO;
  }

  const currAmount = new BigNumber(amount);

  return currAmount.isGreaterThan(0) ? currAmount : ZERO;
}
