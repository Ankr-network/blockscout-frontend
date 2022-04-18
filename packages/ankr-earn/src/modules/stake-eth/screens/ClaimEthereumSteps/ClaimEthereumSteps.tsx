import { ProgressStep } from 'modules/common/components/ProgressStep';
import { t } from 'modules/i18n/utils/intl';

import { useClaimEthereumSteps } from './useClaimEthereumSteps';

export const ClaimEthereumSteps = (): JSX.Element => {
  const {
    isLoading,
    isPending,
    amount,
    error,
    destination,
    transactionId,
    tokenName,
    handleAddTokenToWallet,
  } = useClaimEthereumSteps();

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
      title={t('claim.progress-title')}
      txHash={transactionId}
      onAddTokenToWallet={handleAddTokenToWallet}
    />
  );
};
