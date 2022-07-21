import { UnclaimedAsset } from 'modules/dashboard/components/UnclaimedAsset';

import { useUnclaimedEth } from '../StakedTokens/hooks/ETH/useUnclaimedEth';

export const UnclaimedETH = (): JSX.Element => {
  const { amount, chainId, claimLink, isLoading, token, usdAmount } =
    useUnclaimedEth();

  return (
    <UnclaimedAsset
      amount={amount}
      chainId={chainId}
      claimLink={claimLink}
      isLoading={isLoading}
      token={token}
      usdAmount={usdAmount}
    />
  );
};
