import { Section } from 'modules/stake-ankr/components/Section';
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
          isApproved={isApproved}
          isApproveLoading={isApproveLoading}
          isBalanceLoading={isBalanceLoading}
          isDisabled={isDisabled}
          loading={isStakeLoading}
          minAmount={minStake}
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
