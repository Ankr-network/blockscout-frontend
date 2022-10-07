import { Token } from 'modules/common/types/token';
import { UnstakeSuccess } from 'modules/stake/components/UnstakeSuccess';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

import { useUnstakeFantomSuccessHook } from './useUnstakeFantomSuccessHook';

export const UnstakeFantomSuccess = (): JSX.Element => {
  const { amount, destination, transactionId, tokenName } =
    useUnstakeFantomSuccessHook();

  const { label: unstakeLabel } = useUnstakePendingTimestamp({
    token: Token.FTM,
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
