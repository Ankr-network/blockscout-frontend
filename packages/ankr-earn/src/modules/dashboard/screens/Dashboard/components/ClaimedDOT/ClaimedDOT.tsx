import { ClaimingAsset } from 'modules/dashboard/components/ClaimingAsset';

import { DOT_PROPS } from '../../const';
import { useClaimedPolkadotData } from '../ClaimedTokens/hooks/Polkadot/useClaimedPolkadotData';

export const ClaimedDOT = (): JSX.Element => {
  const { amount, claimLink, ethToken, isLoading, networkTxt, polkadotToken } =
    useClaimedPolkadotData(DOT_PROPS);

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
