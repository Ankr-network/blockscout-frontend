import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { Form, FormRenderProps } from 'react-final-form';

import { AmountInput } from 'modules/common/components/AmountField';
import { ZERO } from 'modules/common/const';
import { convertAmountToBN } from 'modules/common/utils/forms/convertAmountToBN';
import { NodeProviderField } from 'modules/delegate-stake/components/NodeProviderField';
import {
  EFieldsNames,
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/delegate-stake/components/StakeForm/const';
import { setMaxAmount } from 'modules/delegate-stake/utils/setMaxAmount';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import {
  StakeFormBox,
  StakeFormFooter,
  StakeFormTitle,
} from 'modules/stake/components/StakeForm';
import { Button } from 'uiKit/Button';
import { CloseButton } from 'uiKit/CloseButton';
import { OnChange } from 'uiKit/OnChange';
import { Quote } from 'uiKit/Quote';

import { useUnstakeFormStyles } from './useUnstakeFormStyles';

interface IAnkrUnstakeFormProps {
  balance?: BigNumber;
  maxAmount?: BigNumber;
  minAmount: BigNumber;
  loading?: boolean;
  isBalanceLoading?: boolean;
  isDisabled?: boolean;
  tokenIn?: string;
  maxAmountDecimals?: number;
  closeHref: string;
  providerId: string;
  providerName?: string;
  onSubmit: (payload: IStakeSubmitPayload) => void;
  onChange?: (values: IStakeFormPayload, invalid: boolean) => void;
}

export const AnkrUnstakeForm = ({
  balance = ZERO,
  maxAmount = balance,
  minAmount,
  loading = false,
  isBalanceLoading = false,
  isDisabled = false,
  tokenIn = t('unit.ankr'),
  maxAmountDecimals,
  closeHref,
  providerId,
  providerName,
  onSubmit,
  onChange,
}: IAnkrUnstakeFormProps): JSX.Element => {
  const classes = useUnstakeFormStyles();

  const maxStakeAmount = balance.isLessThanOrEqualTo(maxAmount)
    ? balance.toString()
    : maxAmount.toString();

  const onSubmitForm = (payload: IStakeSubmitPayload): void =>
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
  }: FormRenderProps<IStakeSubmitPayload>) => (
    <StakeFormBox className={classes.box} onSubmit={handleSubmit}>
      <CloseButton href={closeHref} />

      <StakeFormTitle>{t('stake-ankr.unstaking.title')}</StakeFormTitle>

      <AmountInput
        balance={balance}
        balanceLabel={t('stake-ankr.unstaking.available')}
        disabled={isDisabled}
        isBalanceLoading={isBalanceLoading}
        label={
          <StakeDescriptionName component="span">
            {t('stake-ankr.unstaking.amount')}
          </StakeDescriptionName>
        }
        maxAmount={maxAmount}
        maxDecimals={maxAmountDecimals}
        minAmount={minAmount.toNumber()}
        name={EFieldsNames.amount}
        tokenName={tokenIn}
        onMaxClick={setMaxAmount(form, maxStakeAmount)}
      />

      <NodeProviderField isDisabled mt={5} providerName={providerName} />

      <Quote mt={6}>{t('stake-ankr.unstaking.undelegeting-info')}</Quote>

      <StakeFormFooter>
        <Button
          fullWidth
          color="primary"
          disabled={isSubmitDisabled}
          isLoading={loading}
          size="large"
          type="submit"
        >
          {t('stake-ankr.unstaking.submit')}
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
