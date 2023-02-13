import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { Faq } from 'modules/common/components/Faq';
import { ZERO } from 'modules/common/const';
import { Section } from 'modules/delegate-stake/components/Section';
import { StakeForm } from 'modules/delegate-stake/components/StakeForm';
import { Stats } from 'modules/delegate-stake/components/Stats';
import { GNOSIS_STAKING_MAX_DECIMALS_LENGTH } from 'modules/stake-mgno/api/GnosisStakingSDK/const';
import { BuyMgnoLink } from 'modules/stake-mgno/components/BuyMgnoLink';
import { SLASHING_PROTECTION_VAR } from 'modules/stake-mgno/const';
import { ApprovalFormButtons } from 'modules/stake/components/ApprovalFormButtons/ApprovalFormButtons';
import { StakeContainer } from 'modules/stake/components/StakeContainer';

import { useMgnoStake } from './hooks/useMgnoStake';
import { useStakeMGNOApprovalForm } from './hooks/useStakeMGNOApprovalForm';
import { useStats } from './hooks/useStats';

export const Stake = (): JSX.Element => {
  const {
    additionalText,
    additionalTooltip,
    amount,
    balance,
    closeHref,
    contributed,
    faqItems,
    initialAmount,
    initialProvider,
    isBalanceLoading,
    isDisabled,
    isStakeLoading,
    maxAmount,
    minStake,
    providerName,
    providerSelectHref,
    quoteText,
    tokenIn,
    greaterMaxError,
    onChange,
    onSubmit,
  } = useMgnoStake();

  const {
    isApproveLoading,
    allowance,
    onApproveSubmit,
    approvalSettingsMode,
    onApprovalSettingsFormSubmit,
  } = useStakeMGNOApprovalForm();

  const renderFormApproveButtons = (amountValue: BigNumber): JSX.Element => (
    <ApprovalFormButtons
      allowance={allowance}
      amount={amountValue}
      approvalSettingsMode={approvalSettingsMode}
      isApproveLoading={isApproveLoading}
      isStakeLoading={isStakeLoading}
      minAmount={minStake}
      tokenName={tokenIn}
      onApprovalSettingsFormSubmit={onApprovalSettingsFormSubmit}
      onApproveSubmit={onApproveSubmit}
    />
  );

  const {
    apyText,
    annualEarning,
    annualEarningUSD,
    delegatedAmount,
    totalStaked,
    totalStakedUSD,
    stakers,
  } = useStats({
    amount,
    provider: initialProvider,
  });

  const slashingProtection = useMemo(() => {
    return !delegatedAmount.isZero()
      ? contributed
          .multipliedBy(SLASHING_PROTECTION_VAR)
          .dividedBy(delegatedAmount.plus(amount))
      : ZERO;
  }, [amount, contributed, delegatedAmount]);

  return (
    <Section withContainer={false}>
      <StakeContainer>
        <StakeForm
          additionalText={additionalText}
          additionalTooltip={additionalTooltip}
          additionalValue={t('unit.percentage-value', {
            value: slashingProtection.integerValue(),
          })}
          amount={amount}
          balance={balance}
          balanceLinkSlot={<BuyMgnoLink />}
          closeHref={closeHref}
          greaterMaxError={greaterMaxError}
          initialAmount={initialAmount}
          initialProvider={initialProvider}
          isBalanceLoading={isBalanceLoading}
          isDisabled={isDisabled}
          maxAmount={maxAmount}
          maxAmountDecimals={GNOSIS_STAKING_MAX_DECIMALS_LENGTH}
          minAmount={minStake}
          providerName={providerName}
          providerSelectHref={providerSelectHref}
          quoteText={quoteText}
          renderFormApproveButtons={renderFormApproveButtons}
          stakingAmountStep={minStake}
          tokenIn={tokenIn}
          onChange={onChange}
          onSubmit={onSubmit}
        />

        <Stats
          annualEarning={annualEarning}
          annualEarningUSD={annualEarningUSD}
          apyText={apyText}
          isLoading={false}
          stakers={stakers}
          token={tokenIn}
          totalStaked={totalStaked}
          totalStakedUSD={totalStakedUSD}
        />

        <Faq data={faqItems} />
      </StakeContainer>
    </Section>
  );
};
