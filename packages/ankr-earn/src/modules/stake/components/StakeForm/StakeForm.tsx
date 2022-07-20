import { Box } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { FormApi } from 'final-form';
import { ReactNode, ReactText, useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { t } from 'common';

import { AmountInput } from 'modules/common/components/AmountField';
import { AuditedLabel } from 'modules/common/components/AuditedLabel';
import { ZERO } from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { floor } from 'modules/common/utils/floor';
import { convertAmountToBN } from 'modules/common/utils/forms/convertAmountToBN';
import { Button } from 'uiKit/Button';
import { OnChange } from 'uiKit/OnChange';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';

import { StakeFormBox } from './StakeFormBox';
import { StakeFormFooter } from './StakeFormFooter';
import { StakeFormTitle } from './StakeFormTitle';
import { useStakeFormStyles } from './useStakeFormStyles';

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
  balanceLabel?: string;
  balanceLinkSlot?: ReactNode;
  minAmount?: BigNumber;
  maxAmount?: BigNumber;
  loading?: boolean;
  isBalanceLoading?: boolean;
  isIntegerOnly?: boolean;
  isDisabled?: boolean;
  tokenIn?: string;
  tokenOut?: string;
  className?: string;
  isMaxBtnShowed?: boolean;
  maxAmountDecimals?: number;
  feeSlot?: ReactNode;
  stakingAmountStep?: number;
  labelTooltip?: ReactText | JSX.Element;
  auditLink?: string;
  renderStats?: (amount: BigNumber) => ReactNode;
  renderFooter?: (amount: BigNumber) => ReactNode;
  onSubmit: (payload: IStakeSubmitPayload) => void;
  onChange?: (values: IStakeFormPayload, invalid: boolean) => void;
}

export const StakeForm = ({
  className,
  balance = ZERO,
  balanceLabel,
  balanceLinkSlot,
  minAmount = ZERO,
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
  stakingAmountStep,
  labelTooltip,
  auditLink,
  renderStats,
  renderFooter,
  onSubmit,
  onChange,
}: IStakeFormComponentProps): JSX.Element => {
  const classes = useStakeFormStyles();
  const withFee = !!feeSlot;

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

      if (withAmountStep && !isMultipleOf) {
        errors.amount = t('validation.multiple-of', {
          value: stakingAmountStep,
        });
      }

      const balanceIsEqualToStep =
        !!stakingAmountStep && balance.isEqualTo(stakingAmountStep);
      if (withFee && balanceIsEqualToStep) {
        errors.amount = t('validation.fee-plus-amount-wrong');
      }

      return errors;
    },
    [balance, stakingAmountStep, withFee],
  );

  const onSubmitForm = (payload: IStakeFormPayload): void =>
    onSubmit({
      ...payload,
      amount: convertAmountToBN(payload?.amount).toFixed(),
    } as IStakeSubmitPayload);

  const renderForm = ({
    form,
    handleSubmit,
    values,
    invalid,
  }: FormRenderProps<IStakeFormPayload>) => {
    const { amount } = values;
    const amountNumber = convertAmountToBN(amount);

    return (
      <StakeFormBox className={className} onSubmit={handleSubmit}>
        <StakeFormTitle>{t('stake.title', { token: tokenIn })}</StakeFormTitle>

        <AmountInput
          balance={balance}
          balanceLabel={balanceLabel}
          balanceLinkSlot={balanceLinkSlot}
          disabled={isDisabled}
          isBalanceLoading={isBalanceLoading}
          isIntegerOnly={isIntegerOnly}
          label={
            <Box alignItems="center" component="span" display="flex">
              {t('stake.token-amount', { token: tokenIn })}

              {labelTooltip && (
                <QuestionWithTooltip>{labelTooltip}</QuestionWithTooltip>
              )}
            </Box>
          }
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

        <StakeFormFooter>
          {typeof renderFooter === 'function' ? (
            renderFooter(amountNumber)
          ) : (
            <Button
              fullWidth
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

          {auditLink && <AuditedLabel auditLink={auditLink} />}
        </StakeFormFooter>

        <OnChange name={FieldsNames.amount}>
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
      render={renderForm}
      validate={validateStakeForm}
      onSubmit={onSubmitForm}
    />
  );
};

function setMaxAmount(form: FormApi<IStakeFormPayload>, maxValue: string) {
  return () => form.change(FieldsNames.amount, maxValue);
}
