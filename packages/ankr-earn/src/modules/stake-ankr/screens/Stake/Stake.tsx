import { Section } from 'modules/stake-ankr/components/Section';
import { StakeContainer } from 'modules/stake/components/StakeContainer';

import { AnkrStakeForm } from './components/AnkrStakeForm';
import { useAnkrStake } from './hooks/useAnkrStake';

export const Stake = (): JSX.Element => {
  const {
    balance,
    loading,
    tokenIn,
    closeHref,
    onSubmit,
    onProviderSelectClick,
  } = useAnkrStake();

  return (
    <Section withContainer={false}>
      <StakeContainer>
        <AnkrStakeForm
          balance={balance}
          closeHref={closeHref}
          isBalanceLoading={false}
          isDisabled={loading}
          loading={loading}
          tokenIn={tokenIn}
          onProviderSelectClick={onProviderSelectClick}
          onSubmit={onSubmit}
        />
      </StakeContainer>
    </Section>
  );
};
