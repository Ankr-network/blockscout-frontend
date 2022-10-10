import { Token } from 'modules/common/types/token';
import { UnstakeSuccess as BaseUnstakeSuccess } from 'modules/stake/components/UnstakeSuccess';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

import { useUnstakeSuccessHook } from './useUnstakeSuccessHook';

export const UnstakeSuccess = (): JSX.Element => {
  const { amount, destination, transactionId, tokenName } =
    useUnstakeSuccessHook();

  const { label: unstakeLabel } = useUnstakePendingTimestamp({
    token: Token.MATIC,
  });

  return (
    <BaseUnstakeSuccess
      amount={amount}
      destinationAddress={destination}
      infoText={unstakeLabel}
      tokenName={tokenName}
      txHash={transactionId}
    />
  );
};
