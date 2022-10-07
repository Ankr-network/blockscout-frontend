import { Token } from 'modules/common/types/token';
import { UnstakeSuccess } from 'modules/stake/components/UnstakeSuccess';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

import { useUnstakePolygonSuccessHook } from './useUnstakePolygonSuccessHook';

export const UnstakePolygonSuccess = (): JSX.Element => {
  const { amount, destination, transactionId, tokenName } =
    useUnstakePolygonSuccessHook();

  const { label: unstakeLabel } = useUnstakePendingTimestamp({
    token: Token.MATIC,
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
