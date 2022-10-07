import { UnclaimedAsset } from 'modules/dashboard/components/UnclaimedAsset';

import { WND_PROPS } from '../../const';
import { useUnclaimedPolkadotCard } from '../../hooks/liquid-tokens/Polkadot/useUnclaimedPolkadotCard';

export const UnclaimedWND = (): JSX.Element => {
  const { amount, claimLink, isLoading, networkTxt, polkadotToken, usdAmount } =
    useUnclaimedPolkadotCard(WND_PROPS);

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
