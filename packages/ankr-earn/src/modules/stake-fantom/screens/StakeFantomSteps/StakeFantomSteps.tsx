import { t } from '@ankr.com/common';

import { ProgressStep } from 'modules/common/components/ProgressStep';
import { getTokenName } from 'modules/common/utils/getTokenName';

import { useStakeFantomStepsHook } from './useStakeFantomStepsHook';

export const StakeFantomSteps = (): JSX.Element => {
  const {
    isLoading,
    isPending,
    amount,
    error,
    destination,
    transactionId,
    tokenName,
    handleAddTokenToWallet,
  } = useStakeFantomStepsHook();

  return (
    <ProgressStep
      amount={amount}
      buttonTitle={t('stake.buttons.addToWallet', {
        token: getTokenName(tokenName),
      })}
      destinationAddress={destination}
      // TODO: need to double check and test it
      error={error as unknown as Error}
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
