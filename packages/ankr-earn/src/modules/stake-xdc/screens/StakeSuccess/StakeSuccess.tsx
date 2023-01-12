import { t } from '@ankr.com/common';

import { ProgressStep } from 'modules/common/components/ProgressStep';

import { useStakeSuccess } from './hooks/useStakeSuccess';

export const StakeSuccess = (): JSX.Element => {
  const {
    amount,
    destinationAddress,
    error,
    isLoading,
    isPending,
    tokenName,
    transactionId,
    onAddTokenClick,
  } = useStakeSuccess();

  return (
    <ProgressStep
      amount={amount}
      buttonTitle={t('stake.buttons.addToWallet', { token: tokenName })}
      destinationAddress={destinationAddress}
      error={error}
      isLoading={isLoading}
      isPending={isPending}
      pendingHint={t('stake.pending.description', { token: tokenName })}
      symbol={tokenName}
      title={t('stake.progressTitle')}
      txHash={transactionId}
      onAddTokenToWallet={onAddTokenClick}
    />
  );
};
