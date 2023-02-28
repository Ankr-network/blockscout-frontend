import { t } from '@ankr.com/common';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { InfoBanner } from '../../components/InfoBanner';
import { UpgradePlanBanner } from 'modules/common/components/UpgradePlanBanner';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { PrivateChains } from './components/PrivateChains';
import { PublicChains } from './components/PublicChains';
import { ReminderDialog } from 'domains/chains/components/ReminderDialog';

export const Chains = () => {
  const { hasPrivateAccess, isFreePremium, isLoggedIn, loading } = useAuth();

  useSetBreadcrumbs([
    {
      title: t(ChainsRoutesConfig.chains.breadcrumbs),
    },
  ]);

  if (hasPrivateAccess) {
    return (
      <>
        {isFreePremium ? <InfoBanner /> : <UpgradePlanBanner />}
        <PrivateChains />
        <ReminderDialog />
      </>
    );
  }

  return (
    <>
      {loading ? <UpgradePlanBanner /> : <InfoBanner />}
      <PublicChains />
      {isLoggedIn && <ReminderDialog />}
    </>
  );
};
