import { tHTML } from '@ankr.com/common';

import { ChainID } from 'modules/chains/types';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useRedirectToEnterpriseOnGroupChange } from 'hooks/useRedirectToEnterpriseOnGroupChange';

import { PrivateChainItemQuery } from './PrivateChainItemQuery';
import { PublicChainItemQuery } from './PublicChainItemQuery';
import { ChainItemBanner } from './components/ChainItemBanner';
import { useSeoTagsForChainItemPage } from '../../hooks/useSeoTagsForChainItemPage';

export const ChainItem = () => {
  const { chainId } = ChainsRoutesConfig.chainDetails.useParams();

  const { hasPrivateAccess, loading } = useAuth();

  useSeoTagsForChainItemPage();

  useRedirectToEnterpriseOnGroupChange();

  return (
    <NoReactSnap>
      {chainId === ChainID.ZKSYNC_ERA && (
        <ChainItemBanner message={tHTML('chain-item.banner-zksync_era')} />
      )}
      {hasPrivateAccess ? (
        <PrivateChainItemQuery chainId={chainId} />
      ) : (
        <PublicChainItemQuery chainId={chainId} loading={loading} />
      )}
    </NoReactSnap>
  );
};
