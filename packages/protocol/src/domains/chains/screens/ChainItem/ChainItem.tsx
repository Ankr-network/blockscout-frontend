import { tHTML } from '@ankr.com/common';

import { ChainID } from 'modules/chains/types';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useRedirectToEnterpriseOnGroupChange } from 'hooks/useRedirectToEnterpriseOnGroupChange';
import { UpgradePlanBanner } from 'modules/common/components/UpgradePlanBanner';

import { PrivateChainItemWrapper } from './PrivateChainItemQuery';
import { PublicChainItemWrapper } from './PublicChainItemWrapper';
import { ChainItemBanner } from './components/ChainItemBanner';
import { ChainItemSkeleton } from './components/ChainItemSkeleton';

export const ChainItem = () => {
  const { chainId } = ChainsRoutesConfig.chainDetails.useParams();

  const { hasPremium, hasPrivateAccess, isLoggedIn, loading } = useAuth();

  useRedirectToEnterpriseOnGroupChange();

  const shouldShowBanner = !hasPremium && isLoggedIn;

  if (loading) {
    return <ChainItemSkeleton />;
  }

  return (
    <>
      {shouldShowBanner && <UpgradePlanBanner isPublicUser />}
      {chainId === ChainID.ZKSYNC_ERA && (
        <NoReactSnap>
          <ChainItemBanner message={tHTML('chain-item.banner-zksync_era')} />
        </NoReactSnap>
      )}
      {hasPrivateAccess ? (
        <PrivateChainItemWrapper chainId={chainId as ChainID} />
      ) : (
        <PublicChainItemWrapper
          chainId={chainId as ChainID}
          loading={loading}
        />
      )}
    </>
  );
};
