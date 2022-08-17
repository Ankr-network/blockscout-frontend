import { Faq } from 'modules/common/components/Faq';
import { Section } from 'modules/delegate-stake/components/Section';
import { Stats } from 'modules/delegate-stake/components/Stats';
import { ANKR_STAKING_MAX_DECIMALS_LENGTH } from 'modules/stake-ankr/api/AnkrStakingSDK/const';
import { useFaq } from 'modules/stake-ankr/hooks/useFaq';
import { useStats } from 'modules/stake-ankr/hooks/useStats';
import { StakeContainer } from 'modules/stake/components/StakeContainer';

import { AnkrStakeMoreForm } from './components/AnkrStakeMoreForm';
import { useAnkrStakeMore } from './hooks/useAnkrStakeMore';

export const StakeMore = (): JSX.Element => {
  const {
    balance,
    isApproved,
    isApproveLoading,
    isBalanceLoading,
    isDisabled,
    isStakeLoading,
    tokenIn,
    closeHref,
    providerId,
    providerName,
    minStake,
    newTotalStake,
    amount,
    apy,
    lockingPeriod,
    onChange,
    onSubmit,
  } = useAnkrStakeMore();

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
  });

  const faqItems = useFaq();

  return (
    <Section withContainer={false}>
      <StakeContainer>
        <AnkrStakeMoreForm
          balance={balance}
          closeHref={closeHref}
          isApproved={isApproved}
          isApproveLoading={isApproveLoading}
          isBalanceLoading={isBalanceLoading}
          isDisabled={isDisabled}
          loading={isStakeLoading}
          lockingPeriod={lockingPeriod}
          maxAmountDecimals={ANKR_STAKING_MAX_DECIMALS_LENGTH}
          minAmount={minStake}
          newTotalStake={newTotalStake}
          providerId={providerId}
          providerName={providerName}
          tokenIn={tokenIn}
          onChange={onChange}
          onSubmit={onSubmit}
        />

        <Stats
          apyText={apyText}
          stakers={stakers}
          token={tokenIn}
          totalStaked={totalStaked}
          totalStakedUSD={totalStakedUSD}
          yearlyEarning={yearlyEarning}
          yearlyEarningUSD={yearlyEarningUSD}
        />

        <Faq data={faqItems} />
      </StakeContainer>
    </Section>
  );
};
