import { t } from '@ankr.com/common';
import { ChainsNewRoutesConfig } from 'domains/chainsNew/routes/routesConfig';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { PrivateChainsNew } from './components/PrivateChainsNew';
import { PublicChainsNew } from './components/PublicChainsNew';

export const ChainsNew = () => {
  const { hasPrivateAccess } = useAuth();

  useSetBreadcrumbs([
    { title: t(ChainsNewRoutesConfig.chiansNew.breadcrumbs) },
  ]);

  if (hasPrivateAccess) {
    return <PrivateChainsNew />;
  }

  return <PublicChainsNew />;
};
