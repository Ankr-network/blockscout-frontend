import { ChainsRoutesConfig } from 'domains/chains/routes';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { PrivateChainItemQuery } from './PrivateChainItemQuery';
import { PublicChainItemQuery } from './PublicChainItemQuery';

export const ChainItem = () => {
  const { chainId } = ChainsRoutesConfig.chainDetails.useParams();

  const { hasPrivateAccess, loading } = useAuth();

  return (
    <NoReactSnap>
      {hasPrivateAccess ? (
        <PrivateChainItemQuery chainId={chainId} loading={loading} />
      ) : (
        <PublicChainItemQuery chainId={chainId} loading={loading} />
      )}
    </NoReactSnap>
  );
};
