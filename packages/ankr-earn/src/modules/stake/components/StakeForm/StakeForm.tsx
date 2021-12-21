import { Container, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React, { ReactNode, ReactText, useCallback, useMemo } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { FormErrors } from 'modules/common/types/FormErrors';
import { floor } from 'modules/common/utils/floor';
import { t } from 'modules/i18n/utils/intl';
import { roundByStep } from 'modules/common/utils/numbers/roundByStep';
import { MutationErrorHandler } from 'modules/common/components/MutationErrorHandler/MutationErrorHandler';
import { UserActionTypes } from 'store/actions/UserActions';
import { Button } from 'uiKit/Button';
import { useStakeFormStyles } from './StakeFormStyles';
import { InputField } from 'uiKit/InputField';
import { Faq } from 'modules/common/components/Faq';
import { StakeStats } from '../StakeStats';

interface IStakePayload {
  amount?: ReactText;
  agreement: boolean;
}

export interface IStakeSubmitPayload extends IStakePayload {
  amount: number;
}

export interface IStakeFormComponentProps {
  onSubmit: (payload: IStakeSubmitPayload) => void;
  onCancel: () => void;
  balance?: BigNumber;
  stakingAmountStep: number;
  minAmount?: number;
  maxAmount?: number;
  loading: boolean;
  currency?: string;
  renderStats?: (amount: number) => ReactNode;
  renderFooter?: (amount: number) => ReactNode;
  faq?: Record<string, string>[];
  stats?: Record<string, string>[];
}

const getAmountNum = (amount?: ReactText): number => {
  if (typeof amount === 'undefined') {
    return 0;
  }

  const currAmount: number = +amount;

  return Number.isFinite(currAmount) && currAmount > 0 ? currAmount : 0;
};

export const StakeForm = ({
  onSubmit,
  onCancel,
  balance = new BigNumber(0),
  stakingAmountStep,
  minAmount = stakingAmountStep,
  maxAmount = balance.toNumber(),
  loading,
  currency = t('unit.eth'),
  renderStats,
  renderFooter,
  faq,
  stats,
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

  const INIT_AMOUNT = balance.isGreaterThan(minAmount)
    ? floor(balance.toNumber(), stakingAmountStep)
    : minAmount;

  const handleInputAmountBlur = (
    onChange: (v: any) => void,
    onBlur: () => void,
  ) => (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur();
    let nearestValue = roundByStep(+e.target.value, stakingAmountStep);
    nearestValue = Math.min(nearestValue, max);
    nearestValue = Math.max(nearestValue, minAmount);

    onChange(nearestValue);
  };

  const onSubmitForm = (payload: IStakePayload): void =>
    onSubmit({
      ...payload,
      amount: getAmountNum(payload?.amount),
    } as IStakeSubmitPayload);

  const renderForm = ({
    handleSubmit,
    values: { amount },
  }: FormRenderProps<IStakePayload>) => {
    const amountNumber: number = getAmountNum(amount);
    return (
      <form onSubmit={handleSubmit}>
        <div className={classes.body}>
          <div className={classes.wrapper}>
            <Typography variant="h2" classes={{ root: classes.title }}>
              {t('stake.title')}
            </Typography>

            <label className={classes.range}>
              <Typography
                variant="h2"
                component="div"
                classes={{ root: classes.label }}
              >
                <div className={classes.labelText}>{t('stake.amount')}</div>
              </Typography>

              <Field
                component={InputField}
                min={minAmount}
                max={max}
                step={stakingAmountStep}
                name="amount"
              />
            </label>

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
              <>
                <MutationErrorHandler type={UserActionTypes.STAKE_AND_CLAIM} />

                <Button
                  color="primary"
                  size="large"
                  className={classes.submit}
                  type="submit"
                  disabled={loading}
                  isLoading={loading}
                >
                  {t('stake.stake', {
                    token: currency,
                  })}
                </Button>
              </>
            )}
          </div>
        </div>
      </form>
    );
  };

  // todo: form must be separated from layout (section, paper...)

  return (
    <section className={classes.root}>
      <Container classes={{ root: classes.container }}>
        <Paper className={classes.box} variant="outlined" square={false}>
          <Form
            onSubmit={onSubmitForm}
            render={renderForm}
            initialValues={{ amount: INIT_AMOUNT }}
            validate={validateStakeForm}
          />
        </Paper>
        {stats && <StakeStats stats={stats} />}
        {faq && <Faq data={faq} />}
      </Container>
    </section>
  );
};
