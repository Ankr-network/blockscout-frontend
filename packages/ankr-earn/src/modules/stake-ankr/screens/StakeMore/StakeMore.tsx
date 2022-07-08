import { Section } from 'modules/stake-ankr/components/Section';
import { StakeContainer } from 'modules/stake/components/StakeContainer';

import { AnkrStakeMoreForm } from './components/AnkrStakeMoreForm';
import { useAnkrStakeMore } from './hooks/useAnkrStakeMore';

export const StakeMore = (): JSX.Element => {
  const {
    balance,
    loading,
    tokenIn,
    closeHref,
    providerId,
    providerName,
    newTotalStake,
    apy,
    onSubmit,
  } = useAnkrStakeMore();

  return (
    <Section withContainer={false}>
      <StakeContainer>
        <AnkrStakeMoreForm
          apy={apy}
          balance={balance}
          closeHref={closeHref}
          isBalanceLoading={false}
          isDisabled={loading}
          loading={loading}
          newTotalStake={newTotalStake}
          providerId={providerId}
          providerName={providerName}
          tokenIn={tokenIn}
          onSubmit={onSubmit}
        />
      </StakeContainer>
    </Section>
  );
};
