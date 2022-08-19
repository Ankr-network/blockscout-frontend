import { UnclaimedAsset } from 'modules/dashboard/components/UnclaimedAsset';

import { DOT_PROPS } from '../StakedTokens/const';
import { useUnclaimedPolkadotData } from '../StakedTokens/hooks/Polkadot/useUnclaimedPolkadotData';

export const UnclaimedDOT = (): JSX.Element => {
  const { amount, claimLink, isLoading, networkTxt, polkadotToken, usdAmount } =
    useUnclaimedPolkadotData(DOT_PROPS);

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
