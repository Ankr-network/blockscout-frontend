import { ClaimingAsset } from 'modules/dashboard/components/ClaimingAsset';

import { KSM_PROPS } from '../../const';
import { useClaimedPolkadotData } from '../ClaimedTokens/hooks/Polkadot/useClaimedPolkadotData';

export const ClaimedKSM = (): JSX.Element => {
  const { amount, claimLink, ethToken, isLoading, networkTxt, polkadotToken } =
    useClaimedPolkadotData(KSM_PROPS);

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
