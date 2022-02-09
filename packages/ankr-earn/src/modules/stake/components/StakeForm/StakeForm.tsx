import { Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { FormApi } from 'final-form';
import { AmountField } from 'modules/common/components/AmountField';
import { FormErrors } from 'modules/common/types/FormErrors';
import { floor } from 'modules/common/utils/floor';
import { t } from 'modules/i18n/utils/intl';
import { ReactNode, ReactText, useCallback, useMemo } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { Button } from 'uiKit/Button';
import { OnChange } from 'uiKit/OnChange';
import { useStakeFormStyles } from './useStakeFormStyles';

enum FieldsNames {
  amount = 'amount',
}

export interface IStakeFormPayload {
  amount?: ReactText;
  agreement: boolean;
}

export interface IStakeSubmitPayload extends IStakeFormPayload {
  amount: number;
}

export interface IStakeFormComponentProps {
  onSubmit: (payload: IStakeSubmitPayload) => void;
  balance?: BigNumber;
  stakingAmountStep: number;
  minAmount?: number;
  maxAmount?: number;
  loading?: boolean;
  isBalanceLoading?: boolean;
  tokenIn?: string;
  tokenOut?: string;
  className?: string;
  renderStats?: (amount: number) => ReactNode;
  renderFooter?: (amount: number) => ReactNode;
  onChange?: (values: IStakeFormPayload) => void;
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
  loading = false,
  isBalanceLoading = false,
  tokenIn = t('unit.eth'),
  tokenOut = tokenIn,
  renderStats,
  renderFooter,
  onChange,
}: IStakeFormComponentProps) => {
  const classes = useStakeFormStyles();

  const validateStakeForm = useCallback(
    ({ amount }: IStakeFormPayload) => {
      const errors: FormErrors<IStakeFormPayload> = {};

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
    (form: FormApi<IStakeFormPayload>, maxAmount: string) => () =>
      form.change('amount', maxAmount),
    [],
  );

  const INIT_AMOUNT = balance.isGreaterThan(minAmount)
    ? floor(balance.toNumber(), stakingAmountStep)
    : minAmount;

  const onSubmitForm = (payload: IStakeFormPayload): void =>
    onSubmit({
      ...payload,
      amount: getAmountNum(payload?.amount),
    } as IStakeSubmitPayload);

  const renderForm = ({
    form,
    handleSubmit,
    values,
  }: FormRenderProps<IStakeFormPayload>) => {
    const { amount } = values;
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
              isBalanceLoading={isBalanceLoading}
              name={FieldsNames.amount}
              tokenName={tokenIn}
              minAmount={minAmount}
              label={t('stake.amount', {
                token: tokenIn,
              })}
              inputClassName={classes.input}
              disabled={loading || isBalanceLoading}
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
                disabled={loading || isBalanceLoading}
                isLoading={loading}
              >
                {t('stake.stake', {
                  token: tokenOut,
                })}
              </Button>
            )}
          </div>
        </div>

        <OnChange name={FieldsNames.amount}>
          {() => {
            if (typeof onChange === 'function') {
              onChange(values);
            }
          }}
        </OnChange>
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
