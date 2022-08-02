import { Section } from 'modules/stake-ankr/components/Section';
import { Stats } from 'modules/stake-ankr/components/Stats';
import { StakeContainer } from 'modules/stake/components/StakeContainer';

import { AnkrStakeForm } from './components/AnkrStakeForm';
import { useAnkrStake } from './hooks/useAnkrStake';

export const Stake = (): JSX.Element => {
  const {
    balance,
    closeHref,
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
    amount,
    onSubmit,
    onChange,
  } = useAnkrStake();

  return (
    <Section withContainer={false}>
      <StakeContainer>
        <AnkrStakeForm
          balance={balance}
          closeHref={closeHref}
          initialProvider={initialProvider}
          isApproved={isApproved}
          isApproveLoading={isApproveLoading}
          isBalanceLoading={isBalanceLoading}
          isDisabled={isDisabled}
          loading={isStakeLoading}
          lockingPeriod={lockingPeriod}
          minAmount={minStake}
          providerName={providerName}
          providerSelectHref={providerSelectHref}
          tokenIn={tokenIn}
          onChange={onChange}
          onSubmit={onSubmit}
        />

        <Stats amount={amount} />
      </StakeContainer>
    </Section>
  );
};
