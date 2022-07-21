import { Grid } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { Form, FormRenderProps } from 'react-final-form';

import { t } from 'common';

import { AmountInput } from 'modules/common/components/AmountField';
import { ZERO } from 'modules/common/const';
import { convertAmountToBN } from 'modules/common/utils/forms/convertAmountToBN';
import { NodeProviderField } from 'modules/stake-ankr/components/NodeProviderField';
import {
  IAnkrStakeSubmitPayload,
  EFieldsNames,
} from 'modules/stake-ankr/types';
import { setMaxAmount } from 'modules/stake-ankr/utils/setMaxAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionSeparator } from 'modules/stake/components/StakeDescriptionSeparator';
import {
  StakeFormBox,
  StakeFormFooter,
  StakeFormTitle,
} from 'modules/stake/components/StakeForm';
import { Button } from 'uiKit/Button';
import { CloseButton } from 'uiKit/CloseButton';
import { OnChange } from 'uiKit/OnChange';
import { Quote } from 'uiKit/Quote';
import { NumericStepper } from 'uiKit/Stepper';

import { useStakeFormStyles } from './useStakeFormStyles';

interface IAnkrStakeMoreFormProps {
  balance?: BigNumber;
  minAmount?: BigNumber;
  maxAmount?: BigNumber;
  loading?: boolean;
  isBalanceLoading?: boolean;
  isApproveLoading?: boolean;
  isDisabled?: boolean;
  isApproved?: boolean;
  tokenIn?: string;
  providerId: string;
  providerName: string;
  maxAmountDecimals?: number;
  closeHref: string;
  apy?: BigNumber;
  newTotalStake?: BigNumber;
  onSubmit: (payload: IAnkrStakeSubmitPayload) => void;
  onChange?: (
    values: Partial<IAnkrStakeSubmitPayload>,
    invalid: boolean,
  ) => void;
}

export const AnkrStakeMoreForm = ({
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
  providerId,
  providerName,
  apy,
  newTotalStake,
  onSubmit,
  onChange,
}: IAnkrStakeMoreFormProps): JSX.Element => {
  const classes = useStakeFormStyles();

  const maxStakeAmount = balance.isLessThanOrEqualTo(maxAmount)
    ? balance.toString()
    : maxAmount.toString();

  const onSubmitForm = (payload: Partial<IAnkrStakeSubmitPayload>): void =>
    onSubmit({
      ...payload,
      amount: convertAmountToBN(payload?.amount).toFixed(),
    } as IAnkrStakeSubmitPayload);

  const isSubmitDisabled = isDisabled || loading || isBalanceLoading;

  const renderForm = ({
    form,
    handleSubmit,
    values,
    invalid,
  }: FormRenderProps<Partial<IAnkrStakeSubmitPayload>>) => (
    <StakeFormBox className={classes.box} onSubmit={handleSubmit}>
      <CloseButton href={closeHref} />

      <StakeFormTitle>{t('stake-ankr.staking.more-title')}</StakeFormTitle>

      <AmountInput
        balance={balance}
        disabled={isDisabled || isApproved}
        isBalanceLoading={isBalanceLoading}
        label={
          <StakeDescriptionName component="span">
            {t('stake-ankr.staking.add-amount')}
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
        mt={5}
        providerName={providerName}
        providerSelectHref=""
      />

      <StakeDescriptionContainer>
        <StakeDescriptionName className={classes.periodLabel}>
          {t('stake-ankr.staking.new-total-stake')}
        </StakeDescriptionName>

        {t('unit.ankr-value', {
          value: newTotalStake?.toFormat(),
        })}
      </StakeDescriptionContainer>

      <StakeDescriptionSeparator />

      <StakeDescriptionContainer>
        <StakeDescriptionName className={classes.periodLabel}>
          {t('stake-ankr.staking.apy')}
        </StakeDescriptionName>

        {t('unit.percentage-value', {
          value: apy?.integerValue(),
        })}
      </StakeDescriptionContainer>

      <Quote pt={1}>{t('stake-ankr.staking.locking-info')}</Quote>

      <StakeFormFooter>
        <Grid container spacing={2}>
          <Grid item xs>
            <Button
              fullWidth
              className={classes.stakeBtn}
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
              className={classes.stakeBtn}
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

  return (
    <Form
      initialValues={{
        provider: providerId,
      }}
      render={renderForm}
      onSubmit={onSubmitForm}
    />
  );
};
