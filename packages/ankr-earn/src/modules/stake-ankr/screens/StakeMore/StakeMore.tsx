import { Section } from 'modules/delegate-stake/components/Section';
import { ANKR_STAKING_MAX_DECIMALS_LENGTH } from 'modules/stake-ankr/api/AnkrStakingSDK/const';
import { Stats } from 'modules/stake-ankr/components/Stats';
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
    amount,
    apy,
    onChange,
    onSubmit,
  } = useAnkrStakeMore();

  return (
    <Section withContainer={false}>
      <StakeContainer>
        <AnkrStakeMoreForm
          balance={balance}
          closeHref={closeHref}
          isApproved={isApproved}
          isApproveLoading={isApproveLoading}
          isBalanceLoading={isBalanceLoading}
          isDisabled={isDisabled}
          loading={isStakeLoading}
          maxAmountDecimals={ANKR_STAKING_MAX_DECIMALS_LENGTH}
          minAmount={minStake}
          newTotalStake={newTotalStake}
          providerId={providerId}
          providerName={providerName}
          tokenIn={tokenIn}
          onChange={onChange}
          onSubmit={onSubmit}
        />

        <Stats amount={amount} apy={apy} />
      </StakeContainer>
    </Section>
  );
};
