import { Section } from 'modules/stake-ankr/components/Section';
import { StakeContainer } from 'modules/stake/components/StakeContainer';

import { ClaimForm } from './components/ClaimForm';
import { useClaim } from './hooks/useClaim';

export const Claim = (): JSX.Element => {
  const {
    balance,
    loading,
    tokenIn,
    closeHref,
    providerId,
    providerName,
    rewards,
    epochEnd,
    onSubmit,
  } = useClaim();

  return (
    <Section withContainer={false}>
      <StakeContainer>
        <ClaimForm
          balance={balance}
          closeHref={closeHref}
          epochEnd={epochEnd}
          isBalanceLoading={false}
          isDisabled={loading}
          loading={loading}
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
