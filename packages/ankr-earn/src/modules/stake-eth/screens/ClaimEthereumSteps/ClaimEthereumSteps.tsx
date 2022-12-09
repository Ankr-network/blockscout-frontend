import { t } from '@ankr.com/common';

import { ProgressStep } from 'modules/common/components/ProgressStep';
import { getTokenName } from 'modules/common/utils/getTokenName';

import { useClaimEthereumSteps } from './useClaimEthereumSteps';

export const ClaimEthereumSteps = (): JSX.Element => {
  const {
    isLoading,
    isPending,
    amount,
    error,
    destination,
    transactionId,
    tokenName: token,
    handleAddTokenToWallet,
  } = useClaimEthereumSteps();

  const tokenName = getTokenName(token);

  return (
    <ProgressStep
      amount={amount}
      buttonTitle={t('stake.buttons.addToWallet', { token: tokenName })}
      destinationAddress={destination}
      error={error}
      hint={t('stake.pending.description', { token: tokenName })}
      isLoading={isLoading}
      isPending={isPending}
      symbol={token}
      title={t('claim.progress-title')}
      txHash={transactionId}
      onAddTokenToWallet={handleAddTokenToWallet}
    />
  );
};
