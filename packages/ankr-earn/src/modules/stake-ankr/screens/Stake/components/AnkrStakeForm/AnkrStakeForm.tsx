import { Box, Grid } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { FormApi } from 'final-form';
import { ReactText } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';

import { t } from 'common';

import { AmountInput } from 'modules/common/components/AmountField';
import { ANKR_1INCH_BUY_LINK, ZERO } from 'modules/common/const';
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
import { NumericStepper } from 'uiKit/Stepper';

import { ReactComponent as AngleRightIcon } from './assets/angle-right.svg';
import { useStakeFormStyles } from './useStakeFormStyles';

const DEFAULT_MIN_AMOUNT = new BigNumber(0.1);

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
  isApproveLoading?: boolean;
  isDisabled?: boolean;
  isApproved?: boolean;
  tokenIn?: string;
  providerSelectHref: string;
  maxAmountDecimals?: number;
  closeHref: string;
  initialProvider?: string;
  providerName?: string;
  lockingPeriod?: Days;
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
  isApproveLoading = false,
  isDisabled = false,
  isApproved = false,
  tokenIn = t('unit.ankr'),
  maxAmountDecimals,
  closeHref,
  providerSelectHref,
  initialProvider,
  providerName,
  lockingPeriod = 0,
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

  const isSubmitDisabled = isDisabled || loading || isBalanceLoading;

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
          balanceLinkSlot={
            <NavLink
              className={classes.balanceLink}
              href={ANKR_1INCH_BUY_LINK}
              variant="text"
            >
              {t('unstake-dialog.buy-ankr')}
            </NavLink>
          }
          disabled={isDisabled || isApproved}
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
                  className={classNames(
                    classes.selectProviderBtn,
                    providerName && classes.selectProviderBtnActive,
                  )}
                  disabled={isDisabled || isApproved}
                  href={providerSelectHref}
                  variant="outlined"
                >
                  {input.value?.toString().length && providerName
                    ? providerName
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
            days: lockingPeriod,
          })}
        </StakeDescriptionContainer>

        <StakeFormFooter>
          <Grid container spacing={2}>
            <Grid item xs>
              <Button
                fullWidth
                color="primary"
                disabled={isApproved || isSubmitDisabled}
                isLoading={isApproveLoading}
                size="large"
                type="submit"
              >
                {t('stake-ankr.staking.approve')}
              </Button>
            </Grid>

            <Grid item xs>
              <Button
                fullWidth
                color="primary"
                disabled={!isApproved || isSubmitDisabled}
                isLoading={loading}
                size="large"
                type="submit"
              >
                {t('stake-ankr.staking.submit')}
              </Button>
            </Grid>
          </Grid>

          <NumericStepper
            activeStep={isApproved ? 1 : 0}
            className={classes.stepper}
            stepsCount={2}
          />
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

  return (
    <Form
      initialValues={{
        provider: initialProvider,
      }}
      render={renderForm}
      onSubmit={onSubmitForm}
    />
  );
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
