import { Box } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { FormApi } from 'final-form';
import { ReactText } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';

import { t } from 'common';

import { AmountInput } from 'modules/common/components/AmountField';
import { ZERO } from 'modules/common/const';
import { Days } from 'modules/common/types';
import { getErrorText, hasError } from 'modules/common/utils/form';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import {
  StakeFormBox,
  StakeFormFooter,
  StakeFormTitle,
} from 'modules/stake/components/StakeForm';
import { Button } from 'uiKit/Button';
import { CloseButton } from 'uiKit/CloseButton';
import { NavLink } from 'uiKit/NavLink';
import { OnChange } from 'uiKit/OnChange';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';

import { ReactComponent as AngleRightIcon } from './assets/angle-right.svg';
import { useStakeFormStyles } from './useStakeFormStyles';

const DEFAULT_MIN_AMOUNT = new BigNumber(0.1);
const LOCKING_PERIOD: Days = 90;

enum EFieldsNames {
  amount = 'amount',
  provider = 'provider',
}

export interface IAnkrStakeSubmitPayload {
  amount: string;
  provider: string;
}

interface IAnkrStakeFormProps {
  balance?: BigNumber;
  minAmount?: BigNumber;
  maxAmount?: BigNumber;
  loading?: boolean;
  isBalanceLoading?: boolean;
  isDisabled?: boolean;
  tokenIn?: string;
  providerSelectHref: string;
  maxAmountDecimals?: number;
  closeHref: string;
  onSubmit: (payload: IAnkrStakeSubmitPayload) => void;
  onChange?: (
    values: Partial<IAnkrStakeSubmitPayload>,
    invalid: boolean,
  ) => void;
}

export const AnkrStakeForm = ({
  balance = ZERO,
  minAmount = DEFAULT_MIN_AMOUNT,
  maxAmount = balance,
  loading = false,
  isBalanceLoading = false,
  isDisabled = false,
  tokenIn = t('unit.ankr'),
  maxAmountDecimals,
  closeHref,
  providerSelectHref,
  onSubmit,
  onChange,
}: IAnkrStakeFormProps): JSX.Element => {
  const classes = useStakeFormStyles();

  const maxStakeAmount = balance.isLessThanOrEqualTo(maxAmount)
    ? balance.toString()
    : maxAmount.toString();

  const validateSelectProvider = (value?: ReactText) => {
    if (!value) {
      return t('validation.required');
    }
    return undefined;
  };

  const onSubmitForm = (payload: Partial<IAnkrStakeSubmitPayload>): void =>
    onSubmit({
      ...payload,
      amount: getAmountNum(payload?.amount).toFixed(),
    } as IAnkrStakeSubmitPayload);

  // todo: add actual text
  const lockingPeriodTooltip = t('stake-ankr.staking.locking-period');

  const renderForm = ({
    form,
    handleSubmit,
    values,
    invalid,
  }: FormRenderProps<Partial<IAnkrStakeSubmitPayload>>) => {
    return (
      <StakeFormBox className={classes.box} onSubmit={handleSubmit}>
        <CloseButton href={closeHref} />

        <StakeFormTitle>{t('stake-ankr.staking.title')}</StakeFormTitle>

        <AmountInput
          balance={balance}
          disabled={isDisabled}
          isBalanceLoading={isBalanceLoading}
          label={
            <StakeDescriptionName component="span">
              {t('stake.amount', { token: tokenIn })}
            </StakeDescriptionName>
          }
          maxAmount={maxAmount}
          maxDecimals={maxAmountDecimals}
          minAmount={minAmount?.toNumber()}
          name={EFieldsNames.amount}
          tokenName={tokenIn}
          onMaxClick={setMaxAmount(form, maxStakeAmount)}
        />

        <Field name={EFieldsNames.provider} validate={validateSelectProvider}>
          {({ input, meta }) => {
            const isError = hasError(meta);

            return (
              <Box mt={5}>
                <input {...input} hidden />

                <Box mb={2}>
                  <StakeDescriptionName
                    className={classNames(
                      isError && classes.selectProviderErrorColor,
                    )}
                  >
                    {t('stake-ankr.staking.provider-label')}
                  </StakeDescriptionName>
                </Box>

                <NavLink
                  className={classes.selectProviderBtn}
                  href={providerSelectHref}
                  variant="outlined"
                >
                  {input.value?.toString().length
                    ? input.value
                    : t('stake-ankr.staking.provider-placeholder')}

                  <AngleRightIcon className={classes.selectProviderIcon} />
                </NavLink>

                <div
                  className={classNames(
                    classes.selectProviderError,
                    classes.selectProviderErrorColor,
                  )}
                >
                  {isError && getErrorText(meta)}
                </div>
              </Box>
            );
          }}
        </Field>

        <StakeDescriptionContainer>
          <StakeDescriptionName className={classes.periodLabel}>
            {t('stake-ankr.staking.locking-period')}

            {lockingPeriodTooltip && (
              <QuestionWithTooltip>{lockingPeriodTooltip}</QuestionWithTooltip>
            )}
          </StakeDescriptionName>

          {t('stake-ankr.staking.locking-period-value', {
            days: LOCKING_PERIOD,
          })}
        </StakeDescriptionContainer>

        <StakeFormFooter>
          <Button
            fullWidth
            color="primary"
            disabled={isDisabled || loading || isBalanceLoading}
            isLoading={loading}
            size="large"
            type="submit"
          >
            {t('stake-ankr.staking.submit')}
          </Button>
        </StakeFormFooter>

        <OnChange name={EFieldsNames.amount}>
          {() => {
            if (typeof onChange === 'function') {
              onChange(values, invalid);
            }
          }}
        </OnChange>
      </StakeFormBox>
    );
  };

  return <Form render={renderForm} onSubmit={onSubmitForm} />;
};

function setMaxAmount(
  form: FormApi<Partial<IAnkrStakeSubmitPayload>>,
  maxValue: string,
) {
  return () => form.change(EFieldsNames.amount, maxValue);
}

function getAmountNum(amount?: ReactText): BigNumber {
  if (typeof amount === 'undefined') {
    return ZERO;
  }

  const currAmount = new BigNumber(amount);

  return currAmount.isGreaterThan(0) ? currAmount : ZERO;
}
