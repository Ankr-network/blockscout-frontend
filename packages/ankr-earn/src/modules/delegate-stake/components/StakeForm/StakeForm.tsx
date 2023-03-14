import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { ReactNode, useCallback, useMemo } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { AmountInput } from 'modules/common/components/AmountField';
import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { convertAmountToBN } from 'modules/common/utils/forms/convertAmountToBN';
import { NodeProviderField } from 'modules/delegate-stake/components/NodeProviderField';
import { setMaxAmount } from 'modules/delegate-stake/utils/setMaxAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionSeparator } from 'modules/stake/components/StakeDescriptionSeparator';
import {
  StakeFormBox,
  StakeFormFooter,
  StakeFormTitle,
} from 'modules/stake/components/StakeForm';
import { calcMaxStakeAmount } from 'modules/stake/utils/calcMaxStakeAmount';
import { CloseButton } from 'uiKit/CloseButton';
import { OnChange } from 'uiKit/OnChange';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';
import { Quote } from 'uiKit/Quote';

import { EFieldsNames, IStakeFormPayload, IStakeSubmitPayload } from './const';
import { useStakeFormStyles } from './useStakeFormStyles';

interface IStakeFormProps {
  amount?: BigNumber;
  auditSlot?: ReactNode;
  balance?: BigNumber;
  minAmount?: BigNumber;
  maxAmount?: BigNumber;
  stakingAmountStep?: BigNumber;
  isBalanceLoading?: boolean;
  isDisabled?: boolean;
  tokenIn?: string;
  providerSelectHref: string;
  maxAmountDecimals?: number;
  closeHref: string;
  initialAmount?: string;
  initialProvider?: string;
  providerName?: string;
  quoteText?: string;
  additionalText?: string;
  additionalTooltip?: string;
  additionalValue?: string;
  balanceLinkSlot?: ReactNode;
  greaterMaxError?: string;
  onSubmit: (payload: IStakeSubmitPayload) => void;
  onChange?: (values: IStakeFormPayload, invalid: boolean) => void;
  renderFormApproveButtons: (amount: BigNumber) => ReactNode;
}

export const StakeForm = ({
  amount = ZERO,
  auditSlot,
  balance = ZERO,
  minAmount = ZERO,
  maxAmount = balance,
  stakingAmountStep,
  isBalanceLoading = false,
  isDisabled = false,
  tokenIn = t('unit.ankr'),
  maxAmountDecimals,
  closeHref,
  providerSelectHref,
  initialAmount,
  initialProvider,
  providerName,
  quoteText,
  additionalText,
  additionalTooltip,
  additionalValue,
  balanceLinkSlot,
  greaterMaxError,
  onSubmit,
  onChange,
  renderFormApproveButtons,
}: IStakeFormProps): JSX.Element => {
  const classes = useStakeFormStyles();

  const maxStakeAmount = useMemo(
    () =>
      calcMaxStakeAmount({
        balance,
        maxAmount,
        stakingAmountStep: stakingAmountStep?.toNumber(),
        maxAmountDecimals,
      }),
    [balance, maxAmount, stakingAmountStep, maxAmountDecimals],
  );

  const validateStakeForm = useCallback(
    (data: IStakeSubmitPayload) => {
      const { amount: formAmount } = data;

      const errors: FormErrors<IStakeSubmitPayload> = {};

      const withAmountStep = !!stakingAmountStep;

      const isMultipleOf =
        formAmount && stakingAmountStep
          ? new BigNumber(formAmount).modulo(stakingAmountStep).isZero()
          : false;

      if (withAmountStep && !isMultipleOf) {
        errors.amount = t('validation.multiple-of', {
          value: stakingAmountStep.toFormat(),
        });
      }

      return errors;
    },
    [stakingAmountStep],
  );

  const onSubmitForm = (payload: IStakeSubmitPayload): void =>
    onSubmit({
      ...payload,
      amount: convertAmountToBN(payload?.amount).toFixed(),
    } as IStakeSubmitPayload);

  const renderForm = ({
    form,
    handleSubmit,
    values,
    invalid,
  }: FormRenderProps<IStakeSubmitPayload>) => {
    return (
      <StakeFormBox className={classes.box} onSubmit={handleSubmit}>
        <CloseButton href={closeHref} />

        <StakeFormTitle>
          {t('delegated-stake.staking.title', {
            token: tokenIn,
          })}
        </StakeFormTitle>

        <AmountInput
          isLongBalance
          balance={balance}
          balanceDecimals={DEFAULT_ROUNDING}
          balanceLinkSlot={balanceLinkSlot}
          disabled={isDisabled}
          isBalanceLoading={isBalanceLoading}
          label={
            <StakeDescriptionName component="span">
              {t('stake.token-amount', { token: tokenIn })}
            </StakeDescriptionName>
          }
          maxAmount={maxAmount}
          maxDecimals={maxAmountDecimals}
          minAmount={minAmount?.toNumber()}
          name={EFieldsNames.amount}
          tokenName={tokenIn}
          validationMessages={{ isGreaterMax: greaterMaxError }}
          onMaxClick={setMaxAmount(form, maxStakeAmount)}
        />

        <NodeProviderField
          isDisabled
          mt={4}
          providerName={providerName}
          providerSelectHref={providerSelectHref}
        />

        {(additionalText || additionalValue) && (
          <StakeDescriptionContainer>
            <StakeDescriptionName className={classes.periodLabel}>
              {additionalText}

              {additionalTooltip && (
                <QuestionWithTooltip>{additionalTooltip}</QuestionWithTooltip>
              )}
            </StakeDescriptionName>

            {additionalValue}
          </StakeDescriptionContainer>
        )}

        <StakeFormFooter>
          {renderFormApproveButtons(amount)}

          {quoteText && <Quote pt={1}>{quoteText}</Quote>}

          {auditSlot && (
            <>
              <StakeDescriptionSeparator mb={3} mt={4} />

              {auditSlot}
            </>
          )}
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
        amount: initialAmount,
      }}
      render={renderForm}
      validate={validateStakeForm}
      onSubmit={onSubmitForm}
    />
  );
};
