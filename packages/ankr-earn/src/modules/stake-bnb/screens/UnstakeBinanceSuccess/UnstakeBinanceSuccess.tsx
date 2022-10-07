import { Token } from 'modules/common/types/token';
import { UnstakeSuccess } from 'modules/stake/components/UnstakeSuccess';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

import { useUnstakeBinanceSuccessHook } from './useUnstakeBinanceSuccessHook';

export const UnstakeBinanceSuccess = (): JSX.Element => {
  const { amount, destination, transactionId, tokenName } =
    useUnstakeBinanceSuccessHook();

  const { label: unstakeLabel } = useUnstakePendingTimestamp({
    token: Token.BNB,
  });

  return (
    <UnstakeSuccess
      amount={amount}
      destinationAddress={destination}
      infoText={unstakeLabel}
      tokenName={tokenName}
      txHash={transactionId}
    />
  );
};
