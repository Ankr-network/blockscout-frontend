import { Section } from 'modules/delegate-stake/components/Section';
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
    onChange,
    onSubmit,
    providerName,
    providerSelectHref,
    tokenIn,
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
