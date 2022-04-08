import { ClaimingAsset } from 'modules/dashboard/components/ClaimingAsset';

import { WND_PROPS } from '../../const';
import { useClaimedPolkadotData } from '../ClaimedTokens/hooks/Polkadot/useClaimedPolkadotData';

export const ClaimedWND = (): JSX.Element => {
  const { amount, claimLink, ethToken, isLoading, networkTxt, polkadotToken } =
    useClaimedPolkadotData(WND_PROPS);

  return (
    <ClaimingAsset
      amount={amount}
      claimLink={claimLink}
      claimToken={ethToken}
      isLoading={isLoading}
      network={networkTxt}
      token={polkadotToken}
    />
  );
};
