import { tHTML } from '@ankr.com/common';

import { ChainID } from 'domains/chains/types';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { PrivateChainItemQuery } from './PrivateChainItemQuery';
import { PublicChainItemQuery } from './PublicChainItemQuery';
import { ChainItemBanner } from './components/ChainItemBanner';

export const ChainItem = () => {
  const { chainId } = ChainsRoutesConfig.chainDetails.useParams();

  const { hasPrivateAccess, loading } = useAuth();

  return (
    <NoReactSnap>
      {chainId === ChainID.ZKSYNC_ERA && (
        <ChainItemBanner message={tHTML('chain-item.banner-zksync_era')} />
      )}
      {chainId.includes(ChainID.POLYGON_ZKEVM) && (
        <ChainItemBanner message={tHTML('chain-item.banner-polygon-zkevm')} />
      )}
      {hasPrivateAccess ? (
        <PrivateChainItemQuery chainId={chainId} />
      ) : (
        <PublicChainItemQuery chainId={chainId} loading={loading} />
      )}
    </NoReactSnap>
  );
};
