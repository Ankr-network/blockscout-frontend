import { t } from '@ankr.com/common';

import { ProgressStep } from 'modules/common/components/ProgressStep';
import { getTokenName } from 'modules/common/utils/getTokenName';

import { useStakeStep } from './hooks/useStakeStep';

export const StakeStep = (): JSX.Element => {
  const {
    amount,
    destinationAddress,
    error,
    isLoading,
    isPending,
    tokenName: token,
    transactionId,
    onAddTokenClick,
  } = useStakeStep();

  const tokenName = getTokenName(token);

  return (
    <ProgressStep
      amount={amount}
      buttonTitle={t('stake.buttons.addToWallet', { token: tokenName })}
      destinationAddress={destinationAddress}
      // TODO: need to double check and test it
      error={error as unknown as Error}
      isLoading={isLoading}
      isPending={isPending}
      pendingHint={t('stake.pending.description', { token: tokenName })}
      symbol={token}
      title={t('stake.progressTitle')}
      txHash={transactionId}
      onAddTokenToWallet={onAddTokenClick}
    />
  );
};
