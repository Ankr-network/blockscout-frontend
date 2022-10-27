import { BuyAnkrLink } from 'modules/common/components/BuyAnkrLink';
import { Faq } from 'modules/common/components/Faq';
import { Section } from 'modules/delegate-stake/components/Section';
import { StakeForm } from 'modules/delegate-stake/components/StakeForm';
import { Stats } from 'modules/delegate-stake/components/Stats';
import { ANKR_STAKING_MAX_DECIMALS_LENGTH } from 'modules/stake-ankr/api/AnkrStakingSDK/const';
import { StakeContainer } from 'modules/stake/components/StakeContainer';

import { useStats } from '../../hooks/useStats';

import { useAnkrStake } from './hooks/useAnkrStake';

export const Stake = (): JSX.Element => {
  const {
    additionalText,
    additionalTooltip,
    additionalValue,
    amount,
    balance,
    closeHref,
    faqItems,
    initialAmount,
    initialProvider,
    isApproveLoading,
    isApproved,
    isBalanceLoading,
    isDisabled,
    isStakeLoading,
    minStake,
    providerName,
    providerSelectHref,
    quoteText,
    tokenIn,
    onChange,
    onSubmit,
  } = useAnkrStake();

  const {
    apyText,
    annualEarning,
    annualEarningUSD,
    totalStaked,
    totalStakedUSD,
    stakers,
    isLoading,
  } = useStats({
    amount,
  });

  return (
    <Section withContainer={false}>
      <StakeContainer>
        <StakeForm
          additionalText={additionalText}
          additionalTooltip={additionalTooltip}
          additionalValue={additionalValue}
          balance={balance}
          balanceLinkSlot={<BuyAnkrLink />}
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
          annualEarning={annualEarning}
          annualEarningUSD={annualEarningUSD}
          apyText={apyText}
          isLoading={isLoading}
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
