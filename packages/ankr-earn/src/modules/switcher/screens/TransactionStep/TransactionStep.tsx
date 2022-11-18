import { t } from '@ankr.com/common';

import { ProgressStep } from 'modules/common/components/ProgressStep';

import { useTransactionStepHook } from './useTransactionStepHook';

export const TransactionStep = (): JSX.Element => {
  const {
    txHash,
    symbol,
    amount,
    destinationAddress,
    isLoading,
    isPending,
    error,
    handleAddTokenToWallet,
  } = useTransactionStepHook();

  return (
    <ProgressStep
      amount={amount}
      buttonTitle={t('switcher.buttons.addToWallet', { token: symbol })}
      destinationAddress={destinationAddress}
      error={error}
      hint={t('switcher.tooltips.pendingTx', { token: symbol })}
      isLoading={isLoading}
      isPending={isPending}
      symbol={symbol}
      title={t('switcher.progressTitle')}
      txHash={txHash}
      onAddTokenToWallet={handleAddTokenToWallet}
    />
  );
};
