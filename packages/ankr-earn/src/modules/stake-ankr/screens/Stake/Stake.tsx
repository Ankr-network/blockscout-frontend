import { Section } from 'modules/delegate-stake/components/Section';
import { ANKR_STAKING_MAX_DECIMALS_LENGTH } from 'modules/stake-ankr/api/AnkrStakingSDK/const';
import { Stats } from 'modules/stake-ankr/components/Stats';
import { StakeContainer } from 'modules/stake/components/StakeContainer';

import { AnkrStakeForm } from './components/AnkrStakeForm';
import { useAnkrStake } from './hooks/useAnkrStake';

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
    lockingPeriod,
    minStake,
    providerName,
    providerSelectHref,
    tokenIn,
    apy,
    onChange,
    onSubmit,
  } = useAnkrStake();

  return (
    <Section withContainer={false}>
      <StakeContainer>
        <AnkrStakeForm
          balance={balance}
          closeHref={closeHref}
          initialAmount={initialAmount}
          initialProvider={initialProvider}
          isApproved={isApproved}
          isApproveLoading={isApproveLoading}
          isBalanceLoading={isBalanceLoading}
          isDisabled={isDisabled}
          loading={isStakeLoading}
          lockingPeriod={lockingPeriod}
          maxAmountDecimals={ANKR_STAKING_MAX_DECIMALS_LENGTH}
          minAmount={minStake}
          providerName={providerName}
          providerSelectHref={providerSelectHref}
          tokenIn={tokenIn}
          onChange={onChange}
          onSubmit={onSubmit}
        />

        <Stats amount={amount} apy={apy} />
      </StakeContainer>
    </Section>
  );
};
