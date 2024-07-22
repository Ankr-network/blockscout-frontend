import { tHTML } from '@ankr.com/common';

import { ChainID } from 'modules/chains/types';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useRedirectToEnterpriseOnGroupChange } from 'hooks/useRedirectToEnterpriseOnGroupChange';

import { PrivateChainItemQuery } from './PrivateChainItemQuery';
import { PublicChainItemQuery } from './PublicChainItemQuery';
import { ChainItemBanner } from './components/ChainItemBanner';

export const ChainItem = () => {
  const { chainId } = ChainsRoutesConfig.chainDetails.useParams();

  const { hasPrivateAccess, loading } = useAuth();

  useRedirectToEnterpriseOnGroupChange();

  return (
    <>
      {chainId === ChainID.ZKSYNC_ERA && (
        <NoReactSnap>
          <ChainItemBanner message={tHTML('chain-item.banner-zksync_era')} />
        </NoReactSnap>
      )}
      {hasPrivateAccess ? (
        <PrivateChainItemQuery chainId={chainId} />
      ) : (
        <PublicChainItemQuery chainId={chainId} loading={loading} />
      )}
    </>
  );
};
