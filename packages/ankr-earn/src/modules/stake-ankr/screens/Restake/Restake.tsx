import { Section } from 'modules/stake-ankr/components/Section';
import { StakeContainer } from 'modules/stake/components/StakeContainer';

import { RestakeForm } from './components/RestakeForm';
import { useRestake } from './hooks/useRestake';

export const Restake = (): JSX.Element => {
  const {
    balance,
    loading,
    tokenIn,
    closeHref,
    providerId,
    providerName,
    newTotalStake,
    apy,
    rewards,
    epochEnd,
    onSubmit,
  } = useRestake();

  return (
    <Section withContainer={false}>
      <StakeContainer>
        <RestakeForm
          apy={apy}
          balance={balance}
          closeHref={closeHref}
          epochEnd={epochEnd}
          isBalanceLoading={false}
          isDisabled={loading}
          loading={loading}
          newTotalStake={newTotalStake}
          providerId={providerId}
          providerName={providerName}
          rewards={rewards}
          tokenIn={tokenIn}
          onSubmit={onSubmit}
        />
      </StakeContainer>
    </Section>
  );
};
