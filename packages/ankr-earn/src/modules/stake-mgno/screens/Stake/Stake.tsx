import { useMemo } from 'react';

import { t } from 'common';

import { ZERO } from 'modules/common/const';
import { Section } from 'modules/delegate-stake/components/Section';
import { StakeForm } from 'modules/delegate-stake/components/StakeForm';
import { Stats } from 'modules/delegate-stake/components/Stats';
import { GNOSIS_STAKING_MAX_DECIMALS_LENGTH } from 'modules/stake-mgno/api/GnosisStakingSDK/const';
import { BuyMgnoLink } from 'modules/stake-mgno/components/BuyMgnoLink';
import { SLASHING_PROTECTION_VAR } from 'modules/stake-mgno/const';
import { StakeContainer } from 'modules/stake/components/StakeContainer';

import { useMgnoStake } from './hooks/useMgnoStake';
import { useStats } from './hooks/useStats';

export const Stake = (): JSX.Element => {
  const {
    amount,
    balance,
    closeHref,
    initialAmount,
    initialProvider,
    isApproved,
    isApproveLoading,
    isBalanceLoading,
    isDisabled,
    isStakeLoading,
    minStake,
    maxAmount,
    providerName,
    providerSelectHref,
    tokenIn,
    quoteText,
    additionalText,
    additionalTooltip,
    contributed,
    onChange,
    onSubmit,
  } = useMgnoStake();

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
          balance={balance}
          balanceLinkSlot={<BuyMgnoLink />}
          closeHref={closeHref}
          initialAmount={initialAmount}
          initialProvider={initialProvider}
          isApproved={isApproved}
          isApproveLoading={isApproveLoading}
          isBalanceLoading={isBalanceLoading}
          isDisabled={isDisabled}
          loading={isStakeLoading}
          maxAmount={maxAmount}
          maxAmountDecimals={GNOSIS_STAKING_MAX_DECIMALS_LENGTH}
          minAmount={minStake}
          providerName={providerName}
          providerSelectHref={providerSelectHref}
          quoteText={quoteText}
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
      </StakeContainer>
    </Section>
  );
};
