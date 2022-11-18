import { t } from '@ankr.com/common';
import { Box } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactNode, ReactText, useCallback, useMemo } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { AmountInput } from 'modules/common/components/AmountField';
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
import { useStakeFormAnalytics } from './useStakeFormAnalytics';
import { useStakeFormStyles } from './useStakeFormStyles';

export enum FieldsNames {
  amount = 'amount',
  code = 'code',
}

export interface IStakeFormPayload {
  amount?: ReactText;
  code?: ReactText;
}

export interface IStakeSubmitPayload extends IStakeFormPayload {
  amount: string;
  code: string;
}

export interface IStakeFormComponentProps {
  auditSlot?: ReactNode;
  balance?: BigNumber;
  balanceLabel?: string;
  balanceLinkSlot?: ReactNode;
  extraValidation?: (
    data: Partial<IStakeFormPayload>,
    errors: FormErrors<IStakeFormPayload>,
  ) => FormErrors<IStakeFormPayload>;
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
  networkTitleSlot?: JSX.Element;
  feeSlot?: ReactNode;
  stakingAmountStep?: number;
  labelTooltip?: ReactText | JSX.Element;
  partnerCodeSlot?: ReactNode;
  handleHaveCodeClick?: () => void;
  renderStats?: (amount: BigNumber) => ReactNode;
  renderFooter?: (amount: BigNumber) => ReactNode;
  onSubmit: (payload: IStakeSubmitPayload) => void;
  onChange?: (values: IStakeFormPayload, invalid: boolean) => void;
  onCodeChange?: (values: IStakeFormPayload, invalid: boolean) => void;
}

export const StakeForm = ({
  auditSlot,
  className,
  balance = ZERO,
  balanceLabel,
  balanceLinkSlot,
  extraValidation,
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
  networkTitleSlot,
  feeSlot,
  stakingAmountStep,
  labelTooltip,
  partnerCodeSlot,
  renderStats,
  renderFooter,
  onSubmit,
  onChange,
  onCodeChange,
}: IStakeFormComponentProps): JSX.Element => {
  const classes = useStakeFormStyles();
  const withFee = !!feeSlot;

  const { onMaxClick } = useStakeFormAnalytics(tokenIn, balance.toString());

  const maxStakeAmount = useMemo(() => {
    const balanceRoundedByStep = stakingAmountStep
      ? `${floor(balance.toNumber(), stakingAmountStep)}`
      : balance.toString();

    const maxRoundedAmount = balance.isLessThanOrEqualTo(maxAmount)
      ? balanceRoundedByStep
      : maxAmount.toString();

    return maxAmountDecimals
      ? new BigNumber(maxRoundedAmount)
          .decimalPlaces(maxAmountDecimals, BigNumber.ROUND_DOWN)
          .toString()
      : maxRoundedAmount;
  }, [balance, maxAmount, maxAmountDecimals, stakingAmountStep]);

  const validateStakeForm = useCallback(
    (data: IStakeFormPayload) => {
      const { amount } = data;

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

      return extraValidation ? extraValidation(data, errors) : errors;
    },
    [balance, extraValidation, stakingAmountStep, withFee],
  );

  const onSubmitForm = (payload: IStakeFormPayload): void =>
    onSubmit({
      ...payload,
      amount: convertAmountToBN(payload?.amount).toFixed(),
      code: partnerCodeSlot ? payload.code : undefined,
    } as IStakeSubmitPayload);

  const renderForm = ({
    form,
    handleSubmit,
    values,
    invalid,
  }: FormRenderProps<IStakeFormPayload>) => {
    const { amount } = values;
    const amountNumber = convertAmountToBN(amount);

    const handleMaxClick = () => {
      form.change(FieldsNames.amount, maxStakeAmount);
      onMaxClick();
    };

    return (
      <StakeFormBox className={className} onSubmit={handleSubmit}>
        <StakeFormTitle>{t('stake.title', { token: tokenIn })}</StakeFormTitle>

        {networkTitleSlot && (
          <div className={classes.networkTitle}>{networkTitleSlot}</div>
        )}

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
          onMaxClick={isMaxBtnShowed ? handleMaxClick : undefined}
        />

        {renderStats && renderStats(amountNumber)}

        {feeSlot}

        {partnerCodeSlot}

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

          {auditSlot}
        </StakeFormFooter>

        <OnChange name={FieldsNames.amount}>
          {() => {
            if (typeof onChange === 'function') {
              onChange(values, invalid);
            }
          }}
        </OnChange>

        <OnChange name={FieldsNames.code}>
          {() => {
            if (typeof onCodeChange === 'function') {
              onCodeChange(values, invalid);
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
