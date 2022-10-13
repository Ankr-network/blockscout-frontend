import { t } from 'common';

import { ProgressStep } from 'modules/common/components/ProgressStep';

import { useStakeStep } from './hooks/useStakeStep';

export const StakeStep = (): JSX.Element => {
  const {
    amount,
    destinationAddress,
    error,
    isLoading,
    isPending,
    tokenName,
    transactionId,
    onAddTokenClick,
  } = useStakeStep();

  return (
    <ProgressStep
      amount={amount}
      buttonTitle={t('stake.buttons.addToWallet', { token: tokenName })}
      destinationAddress={destinationAddress}
      error={error}
      hint={t('stake.pending.description', { token: tokenName })}
      isLoading={isLoading}
      isPending={isPending}
      symbol={tokenName}
      title={t('stake.progressTitle')}
      txHash={transactionId}
      onAddTokenToWallet={onAddTokenClick}
    />
  );
};
