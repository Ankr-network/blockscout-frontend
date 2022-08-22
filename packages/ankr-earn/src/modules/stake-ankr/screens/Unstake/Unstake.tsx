import { Section } from 'modules/delegate-stake/components/Section';
import { StakeContainer } from 'modules/stake/components/StakeContainer';

import { AnkrUnstakeForm } from './components/AnkrUnstakeForm';
import { useAnkrUnstake } from './hooks/useAnkrUnstake';

export const Unstake = (): JSX.Element => {
  const {
    availableUnstake,
    closeHref,
    minAmount,
    isAvailableUnstakeLoading,
    isDisabled,
    isUnstakeLoading,
    providerName,
    providerId,
    tokenIn,
    onChange,
    onSubmit,
  } = useAnkrUnstake();

  return (
    <Section withContainer={false}>
      <StakeContainer>
        <AnkrUnstakeForm
          balance={availableUnstake}
          closeHref={closeHref}
          isBalanceLoading={isAvailableUnstakeLoading}
          isDisabled={isDisabled}
          loading={isUnstakeLoading}
          minAmount={minAmount}
          providerId={providerId}
          providerName={providerName}
          tokenIn={tokenIn}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </StakeContainer>
    </Section>
  );
};
