import { Section } from 'modules/stake-ankr/components/Section';
import { StakeContainer } from 'modules/stake/components/StakeContainer';

import { AnkrUnstakeForm } from './components/AnkrUnstakeForm';
import { useAnkrUnstake } from './hooks/useAnkrUnstake';

export const Unstake = (): JSX.Element => {
  const {
    balance,
    closeHref,
    isBalanceLoading,
    isDisabled,
    isUnstakeLoading,
    providerName,
    providerId,
    tokenIn,
    onSubmit,
  } = useAnkrUnstake();

  return (
    <Section withContainer={false}>
      <StakeContainer>
        <AnkrUnstakeForm
          balance={balance}
          closeHref={closeHref}
          isBalanceLoading={isBalanceLoading}
          isDisabled={isDisabled}
          loading={isUnstakeLoading}
          providerId={providerId}
          providerName={providerName}
          tokenIn={tokenIn}
          onSubmit={onSubmit}
        />
      </StakeContainer>
    </Section>
  );
};
