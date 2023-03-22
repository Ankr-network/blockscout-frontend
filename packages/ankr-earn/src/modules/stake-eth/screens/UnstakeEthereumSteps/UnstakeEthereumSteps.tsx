import { t } from '@ankr.com/common';

import { UnstakeSuccess } from 'modules/stake/components/UnstakeSuccess';

import { useUnstakeEthereumSteps } from './useUnstakeEthereumSteps';

export const UnstakeEthereumSteps = (): JSX.Element => {
  const {
    amount,
    destination,
    error,
    isLoading,
    isReceiptPending,
    tokenName,
    transactionId,
  } = useUnstakeEthereumSteps();

  return (
    <UnstakeSuccess
      amount={amount}
      destinationAddress={destination}
      error={error}
      infoText={t('unstake-dialog.eta', {
        token: tokenName,
        // TODO: use real value
        period: '7',
      })}
      isLoading={isLoading}
      isReceiptPending={isReceiptPending}
      tokenName={tokenName}
      txHash={transactionId}
    />
  );
};
