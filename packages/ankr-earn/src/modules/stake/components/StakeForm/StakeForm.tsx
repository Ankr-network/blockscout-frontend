import { Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { FormApi } from 'final-form';
import { AmountField } from 'modules/common/components/AmountField';
import { FormErrors } from 'modules/common/types/FormErrors';
import { floor } from 'modules/common/utils/floor';
import { t } from 'modules/i18n/utils/intl';
import React, { ReactNode, ReactText, useCallback, useMemo } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { Button } from 'uiKit/Button';
import { useStakeFormStyles } from './useStakeFormStyles';

interface IStakePayload {
  amount?: ReactText;
  agreement: boolean;
}

export interface IStakeSubmitPayload extends IStakePayload {
  amount: number;
}

export interface IStakeFormComponentProps {
  onSubmit: (payload: IStakeSubmitPayload) => void;
  balance?: BigNumber;
  stakingAmountStep: number;
  minAmount?: number;
  maxAmount?: number;
  loading: boolean;
  tokenIn?: string;
  tokenOut?: string;
  className?: string;
  renderStats?: (amount: number) => ReactNode;
  renderFooter?: (amount: number) => ReactNode;
}

const getAmountNum = (amount?: ReactText): number => {
  if (typeof amount === 'undefined') {
    return 0;
  }

  const currAmount: number = +amount;

  return Number.isFinite(currAmount) && currAmount > 0 ? currAmount : 0;
};

export const StakeForm = ({
  className,
  onSubmit,
  balance = new BigNumber(0),
  stakingAmountStep,
  minAmount = stakingAmountStep,
  maxAmount = balance.toNumber(),
  loading,
  tokenIn = t('unit.eth'),
  tokenOut = tokenIn,
  renderStats,
  renderFooter,
}: IStakeFormComponentProps) => {
  const classes = useStakeFormStyles();

  const validateStakeForm = useCallback(
    ({ amount }: IStakePayload) => {
      const errors: FormErrors<IStakePayload> = {};

      if (!amount) {
        errors.amount = t('validation.required');
      } else if (+amount <= 0) {
        errors.amount = t('validation.greater-than-zero');
      } else if (balance?.isLessThan(amount)) {
        errors.amount = t('stake.validation.balance-exceed');
      }

      return errors;
    },
    [balance],
  );

  const max = useMemo(
    () =>
      floor(maxAmount < minAmount ? minAmount : maxAmount, stakingAmountStep),
    [maxAmount, minAmount, stakingAmountStep],
  );

  const setMaxAmount = useCallback(
    (form: FormApi<IStakePayload>, maxAmount: string) => () =>
      form.change('amount', maxAmount),
    [],
  );

  const INIT_AMOUNT = balance.isGreaterThan(minAmount)
    ? floor(balance.toNumber(), stakingAmountStep)
    : minAmount;

  const onSubmitForm = (payload: IStakePayload): void =>
    onSubmit({
      ...payload,
      amount: getAmountNum(payload?.amount),
    } as IStakeSubmitPayload);

  const renderForm = ({
    form,
    handleSubmit,
    values: { amount },
  }: FormRenderProps<IStakePayload>) => {
    const amountNumber: number = getAmountNum(amount);
    return (
      <Paper
        className={className}
        component="form"
        variant="elevation"
        onSubmit={handleSubmit}
      >
        <div className={classes.body}>
          <div className={classes.wrapper}>
            <Typography variant="h2" classes={{ root: classes.title }}>
              {t('stake.title', {
                token: tokenIn,
              })}
            </Typography>

            <AmountField
              balance={balance}
              onMaxClick={setMaxAmount(form, `${max}`)}
              isBalanceLoading={false}
              name="amount"
              tokenName={tokenIn}
              label={t('stake.amount', {
                token: tokenIn,
              })}
              inputClassName={classes.input}
            />

            <div className={classes.stakingTypes}>
              <div className={classNames(classes.stakingType, 'active')}>
                {t('stake.liquid-staking')}
              </div>
              <div className={classes.stakingType}>
                {t('stake.normal-staking')}
              </div>
            </div>

            {renderStats && renderStats(amountNumber)}
          </div>
        </div>

        <div className={classes.footer}>
          <div className={classNames(classes.wrapper, classes.footerWrapper)}>
            {typeof renderFooter === 'function' ? (
              renderFooter(amountNumber)
            ) : (
              <Button
                color="primary"
                size="large"
                className={classes.submit}
                type="submit"
                disabled={loading}
                isLoading={loading}
              >
                {t('stake.stake', {
                  token: tokenOut,
                })}
              </Button>
            )}
          </div>
        </div>
      </Paper>
    );
  };

  return (
    <Form
      onSubmit={onSubmitForm}
      render={renderForm}
      initialValues={{ amount: INIT_AMOUNT }}
      validate={validateStakeForm}
    />
  );
};
