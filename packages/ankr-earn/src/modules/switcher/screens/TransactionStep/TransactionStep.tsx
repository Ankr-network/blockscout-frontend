import { t } from '@ankr.com/common';

import { ProgressStep } from 'modules/common/components/ProgressStep';
import { getTokenName } from 'modules/common/utils/getTokenName';

import { useTransactionStepHook } from './useTransactionStepHook';

export const TransactionStep = (): JSX.Element => {
  const {
    txHash,
    symbol: token,
    amount,
    destinationAddress,
    isLoading,
    isPending,
    error,
    handleAddTokenToWallet,
  } = useTransactionStepHook();

  const tokenName = getTokenName(token);

  return (
    <ProgressStep
      amount={amount}
      buttonTitle={t('switcher.buttons.addToWallet', { token: tokenName })}
      destinationAddress={destinationAddress}
      error={error}
      isLoading={isLoading}
      isPending={isPending}
      pendingHint={t('switcher.tooltips.pendingTx', { token: tokenName })}
      symbol={token}
      title={t('switcher.progressTitle')}
      txHash={txHash}
      onAddTokenToWallet={handleAddTokenToWallet}
    />
  );
};
