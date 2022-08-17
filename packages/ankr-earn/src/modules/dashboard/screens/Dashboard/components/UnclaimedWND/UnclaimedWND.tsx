import { UnclaimedAsset } from 'modules/dashboard/components/UnclaimedAsset';

import { WND_PROPS } from '../StakedTokens/const';
import { useUnclaimedPolkadotData } from '../StakedTokens/hooks/Polkadot/useUnclaimedPolkadotData';

export const UnclaimedWND = (): JSX.Element => {
  const { amount, claimLink, isLoading, networkTxt, polkadotToken, usdAmount } =
    useUnclaimedPolkadotData(WND_PROPS);

  return (
    <UnclaimedAsset
      amount={amount}
      claimLink={claimLink}
      isLoading={isLoading}
      network={networkTxt}
      token={polkadotToken}
      usdAmount={usdAmount}
    />
  );
};
