import { Box } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { Form, FormRenderProps } from 'react-final-form';

import { t } from 'common';

import { AmountInput } from 'modules/common/components/AmountField';
import { FixedInputField } from 'modules/common/components/FixedInputField';
import { ZERO } from 'modules/common/const';
import { convertAmountToBN } from 'modules/common/utils/forms/convertAmountToBN';
import { NodeProviderField } from 'modules/stake-ankr/common/components/NodeProviderField';
import { DEFAULT_MIN_AMOUNT } from 'modules/stake-ankr/common/const';
import { EFieldsNames } from 'modules/stake-ankr/common/types/EFieldsNames';
import { IAnkrStakeSubmitPayload } from 'modules/stake-ankr/common/types/IAnkrStakeSubmitPayload';
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
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';

import { useClaimFormStyles } from './useClaimFormStyles';

interface IClaimFormProps {
  rewards: BigNumber;
  epochEnd: Date;
  balance?: BigNumber;
  minAmount?: BigNumber;
  maxAmount?: BigNumber;
  loading?: boolean;
  isBalanceLoading?: boolean;
  isDisabled?: boolean;
  tokenIn?: string;
  providerId: string;
  providerName: string;
  maxAmountDecimals?: number;
  closeHref: string;
  onSubmit: (payload: IAnkrStakeSubmitPayload) => void;
  onChange?: (
    values: Partial<IAnkrStakeSubmitPayload>,
    invalid: boolean,
  ) => void;
}

export const ClaimForm = ({
  rewards,
  epochEnd,
  balance = ZERO,
  minAmount = DEFAULT_MIN_AMOUNT,
  maxAmount = balance,
  loading = false,
  isBalanceLoading = false,
  isDisabled = false,
  tokenIn = t('unit.ankr'),
  providerId,
  providerName,
  maxAmountDecimals,
  closeHref,
  onSubmit,
  onChange,
}: IClaimFormProps): JSX.Element => {
  const classes = useClaimFormStyles();

  // TODO: change it to actual epochEnd type
  const epochEndDays = epochEnd.getDay();
  const epochEndHours = epochEnd.getHours();
  const epochEndMin = epochEnd.getMinutes();

  const epochEndTimeText = t('stake-ankr.claim.epoch-end', {
    value: `
        ${epochEndDays} day${epochEndDays === 1 ? '' : 's'},
        ${epochEndHours} hour${epochEndHours === 1 ? '' : 's'},
        ${epochEndMin} min
      `,
  });

  const maxStakeAmount = balance.isLessThanOrEqualTo(maxAmount)
    ? balance.toString()
    : maxAmount.toString();

  const onSubmitForm = (payload: Partial<IAnkrStakeSubmitPayload>): void =>
    onSubmit({
      ...payload,
      amount: convertAmountToBN(payload?.amount).toFixed(),
    } as IAnkrStakeSubmitPayload);

  const renderForm = ({
    form,
    handleSubmit,
    values,
    invalid,
  }: FormRenderProps<Partial<IAnkrStakeSubmitPayload>>) => (
    <StakeFormBox className={classes.box} onSubmit={handleSubmit}>
      <CloseButton href={closeHref} />

      <StakeFormTitle>{t('stake-ankr.claim.title')}</StakeFormTitle>

      <Box mb={5}>
        <FixedInputField
          additionalInfoSlot={<div>{epochEndTimeText}</div>}
          label={
            <StakeDescriptionName
              className={classes.disabledLabel}
              component="span"
            >
              {t('stake-ankr.claim.your-rewards')}
            </StakeDescriptionName>
          }
          name={EFieldsNames.yourRewards}
        />
      </Box>

      <AmountInput
        balance={balance}
        balanceLabel={t('stake-ankr.claim.available')}
        disabled={isDisabled}
        isBalanceLoading={isBalanceLoading}
        label={
          <Box
            alignItems="center"
            component="span"
            display="flex"
            fontSize={14}
          >
            {t('stake-ankr.claim.claim-rewards')}

            <QuestionWithTooltip>
              {t('stake-ankr.claim.claim-rewards-tooltip')}
            </QuestionWithTooltip>
          </Box>
        }
        maxAmount={maxAmount}
        maxDecimals={maxAmountDecimals}
        minAmount={minAmount?.toNumber()}
        name={EFieldsNames.claimRewards}
        tokenName={tokenIn}
        onMaxClick={setMaxAmount(form, maxStakeAmount)}
      />

      <NodeProviderField
        isDisabled
        mt={5}
        providerName={providerName}
        providerSelectHref=""
      />

      <StakeFormFooter>
        <Button
          fullWidth
          className={classes.stakeBtn}
          color="primary"
          disabled={isDisabled || loading || isBalanceLoading}
          isLoading={loading}
          size="large"
          type="submit"
        >
          {t('stake-ankr.claim.submit')}
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
        yourRewards: rewards.toFormat(),
      }}
      render={renderForm}
      onSubmit={onSubmitForm}
    />
  );
};
