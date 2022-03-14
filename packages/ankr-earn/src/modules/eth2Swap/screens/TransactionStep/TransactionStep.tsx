import { ProgressStep } from 'modules/common/components/ProgressStep';
import { t } from 'modules/i18n/utils/intl';

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
      buttonTitle={t('eth2Swap.buttons.addToWallet', { token: symbol })}
      destinationAddress={destinationAddress}
      error={error}
      hint={t('eth2Swap.tooltips.pendingTx', { token: symbol })}
      isLoading={isLoading}
      isPending={isPending}
      symbol={symbol}
      title={t('eth2Swap.progressTitle')}
      txHash={txHash}
      onAddTokenToWallet={handleAddTokenToWallet}
    />
  );
};
