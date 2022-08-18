import { Section } from 'modules/delegate-stake/components/Section';
import { StakeForm } from 'modules/delegate-stake/components/StakeForm';
import { Stats } from 'modules/delegate-stake/components/Stats';
import { ANKR_STAKING_MAX_DECIMALS_LENGTH } from 'modules/stake-ankr/api/AnkrStakingSDK/const';
import { BuyMgnoLink } from 'modules/stake-mgno/components/BuyMgnoLink';
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
    isApyLoading,
    isDisabled,
    isStakeLoading,
    minStake,
    providerName,
    providerSelectHref,
    tokenIn,
    apy,
    quoteText,
    additionalText,
    additionalTooltip,
    additionalValue,
    onChange,
    onSubmit,
  } = useMgnoStake();

  const {
    apyText,
    yearlyEarning,
    yearlyEarningUSD,
    totalStaked,
    totalStakedUSD,
    stakers,
  } = useStats({
    amount,
    apy,
    isApyLoading,
  });

  return (
    <Section withContainer={false}>
      <StakeContainer>
        <StakeForm
          additionalText={additionalText}
          additionalTooltip={additionalTooltip}
          additionalValue={additionalValue}
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
          maxAmountDecimals={ANKR_STAKING_MAX_DECIMALS_LENGTH}
          minAmount={minStake}
          providerName={providerName}
          providerSelectHref={providerSelectHref}
          quoteText={quoteText}
          tokenIn={tokenIn}
          onChange={onChange}
          onSubmit={onSubmit}
        />

        <Stats
          apyText={apyText}
          isLoading={false}
          stakers={stakers}
          token={tokenIn}
          totalStaked={totalStaked}
          totalStakedUSD={totalStakedUSD}
          yearlyEarning={yearlyEarning}
          yearlyEarningUSD={yearlyEarningUSD}
        />
      </StakeContainer>
    </Section>
  );
};
