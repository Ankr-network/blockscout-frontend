import { UnclaimedAsset } from 'modules/dashboard/components/UnclaimedAsset';

import { useUnclaimedEth } from '../StakedTokens/hooks/ETH/useUnclaimedEth';

export const UnclaimedETH = (): JSX.Element => {
  const { chainId, token, amount, claimLink, isLoading } = useUnclaimedEth();

  return (
    <UnclaimedAsset
      amount={amount}
      chainId={chainId}
      claimLink={claimLink}
      isLoading={isLoading}
      token={token}
    />
  );
};
