import { t } from '@ankr.com/common';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { InfoBanner } from '../../components/InfoBanner';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { PrivateChains } from './components/PrivateChains';
import { PublicChains } from './components/PublicChains';

export const Chains = () => {
  const { hasPrivateAccess, loading } = useAuth();

  useSetBreadcrumbs([
    {
      title: t(ChainsRoutesConfig.chains.breadcrumbs),
    },
  ]);

  if (hasPrivateAccess) {
    return <PrivateChains />;
  }

  return (
    <>
      {!loading && <InfoBanner />}
      <PublicChains />
    </>
  );
};
