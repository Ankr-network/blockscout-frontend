import { t } from '@ankr.com/common';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { PrivateChains } from './components/PrivateChains';
import { PublicChains } from './components/PublicChains';
import { ReminderDialog } from 'domains/chains/components/ReminderDialog';
import { InfoBanner } from '../../components/InfoBanner';

export const Chains = () => {
  const { hasPrivateAccess, loading, isLoggedIn } = useAuth();

  useSetBreadcrumbs([
    {
      title: t(ChainsRoutesConfig.chains.breadcrumbs),
    },
  ]);

  if (hasPrivateAccess) {
    return (
      <>
        <PrivateChains />
        <ReminderDialog />
      </>
    );
  }

  return (
    <>
      {!loading && <InfoBanner />}
      <PublicChains />
      {isLoggedIn && <ReminderDialog />}
    </>
  );
};
