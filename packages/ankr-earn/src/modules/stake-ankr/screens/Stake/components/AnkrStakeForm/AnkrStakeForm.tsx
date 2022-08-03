import { Grid } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { Form, FormRenderProps } from 'react-final-form';

import { t } from 'common';

import { AmountInput } from 'modules/common/components/AmountField';
import { BuyAnkrLink } from 'modules/common/components/BuyAnkrLink';
import { ZERO } from 'modules/common/const';
import { Days } from 'modules/common/types';
import { convertAmountToBN } from 'modules/common/utils/forms/convertAmountToBN';
import { NodeProviderField } from 'modules/stake-ankr/components/NodeProviderField';
import {
  IAnkrStakeSubmitPayload,
  EFieldsNames,
} from 'modules/stake-ankr/types';
import { setMaxAmount } from 'modules/stake-ankr/utils/setMaxAmount';
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

import { useStakeFormStyles } from './useStakeFormStyles';

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

  const onSubmitForm = (payload: Partial<IAnkrStakeSubmitPayload>): void =>
    onSubmit({
      ...payload,
      amount: convertAmountToBN(payload?.amount).toFixed(),
    } as IAnkrStakeSubmitPayload);

  const lockingPeriodTooltip = t('stake-ankr.staking.locking-period-tooltip');

  const isSubmitDisabled = isDisabled || loading || isBalanceLoading;

  const renderForm = ({
    form,
    handleSubmit,
    values,
    invalid,
  }: FormRenderProps<Partial<IAnkrStakeSubmitPayload>>) => (
    <StakeFormBox className={classes.box} onSubmit={handleSubmit}>
      <CloseButton href={closeHref} />

      <StakeFormTitle>{t('stake-ankr.staking.title')}</StakeFormTitle>

      <AmountInput
        isLongBalance
        balance={balance}
        balanceLinkSlot={<BuyAnkrLink />}
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
        isDisabled={isDisabled || isApproved}
        mt={5}
        providerName={providerName}
        providerSelectHref={providerSelectHref}
      />

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

        {isApproved && <Quote pt={1}>{t('stake-ankr.staking.fee-info')}</Quote>}
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
      }}
      render={renderForm}
      onSubmit={onSubmitForm}
    />
  );
};
