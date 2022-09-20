import { Token } from 'modules/common/types/token';
import { UnstakeSuccess } from 'modules/stake/components/UnstakeSuccess';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

import { useUnstakeAvalancheSuccess } from './useUnstakeAvalancheSuccess';

export const UnstakeAvalancheSuccess = (): JSX.Element => {
  const { amount, destination, transactionId, tokenName } =
    useUnstakeAvalancheSuccess();

  const { label: unstakeLabel } = useUnstakePendingTimestamp({
    token: Token.AVAX,
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
