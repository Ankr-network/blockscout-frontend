import { Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { FormApi } from 'final-form';
import { ReactNode, ReactText, useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { AmountInput } from 'modules/common/components/AmountField';
import { ZERO } from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'uiKit/Button';
import { OnChange } from 'uiKit/OnChange';

import { useStakeFormStyles } from './useStakeFormStyles';

const DEFAULT_MIN_AMOUNT = new BigNumber(0.1);

enum FieldsNames {
  amount = 'amount',
}

export interface IStakeFormPayload {
  agreement: boolean;
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
  tokenIn?: string;
  tokenOut?: string;
  className?: string;
  isMaxBtnShowed?: boolean;
  renderStats?: (amount: BigNumber) => ReactNode;
  renderFooter?: (amount: BigNumber) => ReactNode;
  onSubmit: (payload: IStakeSubmitPayload) => void;
  onChange?: (values: IStakeFormPayload) => void;
}

const getAmountNum = (amount?: ReactText): BigNumber => {
  if (typeof amount === 'undefined') {
    return ZERO;
  }

  const currAmount = new BigNumber(amount);

  return currAmount.isGreaterThan(0) ? currAmount : ZERO;
};

export const StakeForm = ({
  className,
  balance = ZERO,
  minAmount = DEFAULT_MIN_AMOUNT,
  maxAmount = balance,
  loading = false,
  isBalanceLoading = false,
  tokenIn = t('unit.eth'),
  tokenOut = tokenIn,
  isMaxBtnShowed = true,
  renderStats,
  renderFooter,
  onSubmit,
  onChange,
}: IStakeFormComponentProps): JSX.Element => {
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

  const setMaxAmount = useCallback(
    (form: FormApi<IStakeFormPayload>, maxValue: string) => () =>
      form.change('amount', maxValue),
    [],
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
              isBalanceLoading={isBalanceLoading}
              label={t('stake.amount', {
                token: tokenIn,
              })}
              minAmount={minAmount?.toNumber()}
              name={FieldsNames.amount}
              tokenName={tokenIn}
              onMaxClick={
                isMaxBtnShowed
                  ? setMaxAmount(form, `${maxAmount.toString()}`)
                  : undefined
              }
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
                className={classes.submit}
                color="primary"
                disabled={loading || isBalanceLoading}
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
      render={renderForm}
      validate={validateStakeForm}
      onSubmit={onSubmitForm}
    />
  );
};
