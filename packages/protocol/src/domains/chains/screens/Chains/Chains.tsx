import { ChainsRoutesConfig } from 'domains/chains/routes';
import { t } from 'modules/i18n/utils/intl';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';

import { InfoBanner } from './components/Banner';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { PrivateChains } from './components/PrivateChains';
import { PublicChains, PublicChainsProps } from './components/PublicChains';

export const Chains = ({ isMMIndex }: PublicChainsProps) => {
  const { credentials, loading } = useAuth();

  useSetBreadcrumbs([
    {
      title: t(ChainsRoutesConfig.chains.breadcrumbs),
    },
  ]);

  return (
    <>
      {!credentials && !loading && <InfoBanner />}
      {credentials ? <PrivateChains /> : <PublicChains isMMIndex={isMMIndex} />}
    </>
  );
};
