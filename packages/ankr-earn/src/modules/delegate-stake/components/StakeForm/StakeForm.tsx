import { Grid } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { t } from 'common';

import { AmountInput } from 'modules/common/components/AmountField';
import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { convertAmountToBN } from 'modules/common/utils/forms/convertAmountToBN';
import { NodeProviderField } from 'modules/delegate-stake/components/NodeProviderField';
import { setMaxAmount } from 'modules/delegate-stake/utils/setMaxAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import {
  StakeFormBox,
  StakeFormFooter,
  StakeFormTitle,
} from 'modules/stake/components/StakeForm';
import { Button } from 'uiKit/Button';
import { CloseButton } from 'uiKit/CloseButton';
import { OnChange } from 'uiKit/OnChange';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';
import { Quote } from 'uiKit/Quote';
import { NumericStepper } from 'uiKit/Stepper';

import { EFieldsNames, IStakeSubmitPayload } from './const';
import { useStakeFormStyles } from './useStakeFormStyles';

interface IStakeFormProps {
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
  initialAmount?: string;
  initialProvider?: string;
  providerName?: string;
  quoteText?: string;
  additionalText?: string;
  additionalTooltip?: string;
  additionalValue?: string;
  balanceLinkSlot?: ReactNode;
  onSubmit: (payload: IStakeSubmitPayload) => void;
  onChange?: (values: Partial<IStakeSubmitPayload>, invalid: boolean) => void;
}

export const StakeForm = ({
  balance = ZERO,
  minAmount = ZERO,
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
  initialAmount,
  initialProvider,
  providerName,
  quoteText,
  additionalText,
  additionalTooltip,
  additionalValue,
  balanceLinkSlot,
  onSubmit,
  onChange,
}: IStakeFormProps): JSX.Element => {
  const classes = useStakeFormStyles();

  const maxStakeAmount = balance.isLessThanOrEqualTo(maxAmount)
    ? balance.toString()
    : maxAmount.toString();

  const onSubmitForm = (payload: Partial<IStakeSubmitPayload>): void =>
    onSubmit({
      ...payload,
      amount: convertAmountToBN(payload?.amount).toFixed(),
    } as IStakeSubmitPayload);

  const isSubmitDisabled = isDisabled || loading || isBalanceLoading;

  const renderForm = ({
    form,
    handleSubmit,
    values,
    invalid,
  }: FormRenderProps<Partial<IStakeSubmitPayload>>) => (
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
        disabled={isDisabled || isApproved}
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
              {t('delegated-stake.staking.approve')}
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
              {t('delegated-stake.staking.submit')}
            </Button>
          </Grid>
        </Grid>

        <NumericStepper
          activeStep={isApproved ? 1 : 0}
          className={classes.stepper}
          stepsCount={2}
        />

        {quoteText && <Quote pt={1}>{quoteText}</Quote>}
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

  return (
    <Form
      initialValues={{
        provider: initialProvider,
        amount: initialAmount,
      }}
      render={renderForm}
      onSubmit={onSubmitForm}
    />
  );
};
