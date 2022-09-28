import { UnclaimedAsset } from 'modules/dashboard/components/UnclaimedAsset';

import { KSM_PROPS } from '../../const';
import { useUnclaimedPolkadotCard } from '../../hooks/liquid-tokens/Polkadot/useUnclaimedPolkadotCard';

export const UnclaimedKSM = (): JSX.Element => {
  const { amount, claimLink, isLoading, networkTxt, polkadotToken, usdAmount } =
    useUnclaimedPolkadotCard(KSM_PROPS);

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
