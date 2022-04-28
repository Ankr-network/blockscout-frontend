import { UnclaimedAsset } from 'modules/dashboard/components/UnclaimedAsset';

import { WND_PROPS } from '../StakedTokens/const';
import { useUnclaimedPolkadotData } from '../StakedTokens/hooks/Polkadot/useUnclaimedPolkadotData';

export const UnclaimedWND = (): JSX.Element => {
  const { amount, claimLink, ethToken, isLoading, networkTxt, polkadotToken } =
    useUnclaimedPolkadotData(WND_PROPS);

  return (
    <UnclaimedAsset
      amount={amount}
      claimLink={claimLink}
      claimToken={ethToken}
      isLoading={isLoading}
      network={networkTxt}
      token={polkadotToken}
    />
  );
};
