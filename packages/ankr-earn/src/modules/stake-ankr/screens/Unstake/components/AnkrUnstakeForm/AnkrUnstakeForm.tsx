import BigNumber from 'bignumber.js';
import { Form, FormRenderProps } from 'react-final-form';

import { t } from 'common';

import { AmountInput } from 'modules/common/components/AmountField';
import { BuyAnkrLink } from 'modules/common/components/BuyAnkrLink';
import { ZERO } from 'modules/common/const';
import { convertAmountToBN } from 'modules/common/utils/forms/convertAmountToBN';
import { NodeProviderField } from 'modules/stake-ankr/common/components/NodeProviderField';
import { DEFAULT_MIN_AMOUNT } from 'modules/stake-ankr/common/const';
import {
  IAnkrStakeSubmitPayload,
  EFieldsNames,
} from 'modules/stake-ankr/common/types';
import { setMaxAmount } from 'modules/stake-ankr/common/utils/setMaxAmount';
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
  minAmount?: BigNumber;
  maxAmount?: BigNumber;
  loading?: boolean;
  isBalanceLoading?: boolean;
  isDisabled?: boolean;
  tokenIn?: string;
  maxAmountDecimals?: number;
  closeHref: string;
  providerId: string;
  providerName?: string;
  onSubmit: (payload: IAnkrStakeSubmitPayload) => void;
  onChange?: (
    values: Partial<IAnkrStakeSubmitPayload>,
    invalid: boolean,
  ) => void;
}

export const AnkrUnstakeForm = ({
  balance = ZERO,
  minAmount = DEFAULT_MIN_AMOUNT,
  maxAmount = balance,
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

      <StakeFormTitle>{t('stake-ankr.unstaking.title')}</StakeFormTitle>

      <AmountInput
        balance={balance}
        balanceLinkSlot={<BuyAnkrLink />}
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

      <NodeProviderField
        isDisabled
        mt={5}
        providerName={providerName}
        providerSelectHref=""
      />

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
