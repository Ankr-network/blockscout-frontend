import { Grid } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { Form, FormRenderProps } from 'react-final-form';

import { t } from 'common';

import { AmountInput } from 'modules/common/components/AmountField';
import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { Days } from 'modules/common/types';
import { convertAmountToBN } from 'modules/common/utils/forms/convertAmountToBN';
import { NodeProviderField } from 'modules/delegate-stake/components/NodeProviderField';
import {
  EFieldsNames,
  IAnkrStakeFormPayload,
  IAnkrStakeSubmitPayload,
} from 'modules/delegate-stake/components/StakeForm/const';
import { setMaxAmount } from 'modules/delegate-stake/utils/setMaxAmount';
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
  newTotalStake?: BigNumber;
  lockingPeriod?: Days;
  onSubmit: (payload: IAnkrStakeSubmitPayload) => void;
  onChange?: (values: IAnkrStakeFormPayload, invalid: boolean) => void;
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
  newTotalStake,
  lockingPeriod,
  onSubmit,
  onChange,
}: IAnkrStakeMoreFormProps): JSX.Element => {
  const classes = useStakeFormStyles();

  const maxStakeAmount = balance.isLessThanOrEqualTo(maxAmount)
    ? balance.toString()
    : maxAmount.toString();

  const onSubmitForm = (payload: IAnkrStakeSubmitPayload): void =>
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
  }: FormRenderProps<IAnkrStakeSubmitPayload>) => (
    <StakeFormBox className={classes.box} onSubmit={handleSubmit}>
      <CloseButton href={closeHref} />

      <StakeFormTitle>{t('stake-ankr.staking.more-title')}</StakeFormTitle>

      <AmountInput
        isLongBalance
        balance={balance}
        balanceDecimals={DEFAULT_ROUNDING}
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

      <NodeProviderField isDisabled mt={5} providerName={providerName} />

      <StakeDescriptionContainer>
        <StakeDescriptionName className={classes.periodLabel}>
          {t('stake-ankr.staking.new-total-stake')}
        </StakeDescriptionName>

        {t('unit.ankr-value', {
          value: newTotalStake?.toFormat(),
        })}
      </StakeDescriptionContainer>

      <StakeDescriptionSeparator />

      <Quote pt={1}>
        {t('stake-ankr.staking.locking-info', {
          value: lockingPeriod,
        })}
      </Quote>

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
