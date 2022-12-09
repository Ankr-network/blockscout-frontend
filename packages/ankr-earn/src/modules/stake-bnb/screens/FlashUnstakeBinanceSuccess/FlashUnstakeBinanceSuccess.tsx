import { t } from '@ankr.com/common';

import { UnstakeSuccess } from 'modules/stake/components/UnstakeSuccess';

import { useUnstakeBinanceSuccessHook } from '../UnstakeBinanceSuccess/useUnstakeBinanceSuccessHook';

export const FlashUnstakeBinanceSuccess = (): JSX.Element => {
  const { amount, destination, transactionId, tokenName } =
    useUnstakeBinanceSuccessHook();

  return (
    <UnstakeSuccess
      amount={amount}
      destinationAddress={destination}
      infoText={t('stake-bnb.unstake.instant-success')}
      tokenName={tokenName}
      txHash={transactionId}
    />
  );
};
