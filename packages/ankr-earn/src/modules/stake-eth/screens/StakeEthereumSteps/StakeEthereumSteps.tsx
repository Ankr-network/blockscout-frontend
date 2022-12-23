import { t } from '@ankr.com/common';

import { ProgressStep } from 'modules/common/components/ProgressStep';
import { getTokenName } from 'modules/common/utils/getTokenName';

import { useStakeEthereumStepsHook } from './useStakeEthereumStepsHook';

export const StakeEthereumSteps = (): JSX.Element => {
  const {
    isLoading,
    isPending,
    amount,
    error,
    destination,
    transactionId,
    tokenName: token,
    handleAddTokenToWallet,
  } = useStakeEthereumStepsHook();

  const tokenName = getTokenName(token);

  return (
    <ProgressStep
      amount={amount}
      buttonTitle={t('stake.buttons.addToWallet', { token: tokenName })}
      destinationAddress={destination}
      // TODO: need to double check and test it
      error={error as unknown as Error}
      hint={t('stake.pending.description', { token: tokenName })}
      isLoading={isLoading}
      isPending={isPending}
      symbol={token}
      title={t('stake.progressTitle')}
      txHash={transactionId}
      onAddTokenToWallet={handleAddTokenToWallet}
    />
  );
};
