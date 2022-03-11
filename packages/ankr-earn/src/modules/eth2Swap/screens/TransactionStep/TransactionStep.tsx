import { ProgressStep } from 'modules/common/components/ProgressStep';
import { t } from 'modules/i18n/utils/intl';

import { useTransactionStepHook } from './useTransactionStepHook';

// TODO: add route after component is ready
export const TransactionStep = (): JSX.Element => {
  const {
    txHash,
    symbol,
    amount,
    destinationAddress,
    isLoading,
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
      isPending={false}
      symbol={symbol}
      title={t('eth2Swap.progressTitle')}
      txHash={txHash}
      onAddTokenToWallet={handleAddTokenToWallet}
    />
  );
};
