import { t } from '@ankr.com/common';

import { ProgressStep } from 'modules/common/components/ProgressStep';

import { useStakeEthereumStepsHook } from './useStakeEthereumStepsHook';

export const StakeEthereumSteps = (): JSX.Element => {
  const {
    isLoading,
    isPending,
    amount,
    error,
    destination,
    transactionId,
    tokenName,
    handleAddTokenToWallet,
  } = useStakeEthereumStepsHook();

  return (
    <ProgressStep
      amount={amount}
      buttonTitle={t('stake.buttons.addToWallet', { token: tokenName })}
      destinationAddress={destination}
      error={error}
      hint={t('stake.pending.description', { token: tokenName })}
      isLoading={isLoading}
      isPending={isPending}
      symbol={tokenName}
      title={t('stake.progressTitle')}
      txHash={transactionId}
      onAddTokenToWallet={handleAddTokenToWallet}
    />
  );
};
