import { Box } from '@mui/material';
import { t } from '@ankr.com/common';

import { AdvancedApiRoutesConfig } from 'domains/advancedApi/routes';
import { CONTAINER_STYLES } from 'modules/layout/components/DefautLayout';
import { ChainID } from 'modules/chains/types';
import { PrivateChainItemQuery } from 'domains/chains/screens/ChainItem/PrivateChainItemQuery';
import { PublicChainItemQuery } from 'domains/chains/screens/ChainItem/PublicChainItemQuery';
import { UpgradePlanBanner } from 'modules/common/components/UpgradePlanBanner';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useRedirectToEnterpriseOnGroupChange } from 'hooks/useRedirectToEnterpriseOnGroupChange';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';

export const AdvancedApiDetails = () => {
  const { hasPrivateAccess, loading } = useAuth();

  useSetBreadcrumbs([
    {
      title: t(AdvancedApiRoutesConfig.advancedApi.breadcrumbs),
    },
  ]);

  useRedirectToEnterpriseOnGroupChange();

  return (
    <Box sx={CONTAINER_STYLES}>
      {/* Banner with "upgrade plan" should be hidden for enterprise */}
      <UpgradePlanBanner isAdvancedApi />

      {hasPrivateAccess ? (
        <PrivateChainItemQuery chainId={ChainID.MULTICHAIN} loading={loading} />
      ) : (
        <PublicChainItemQuery chainId={ChainID.MULTICHAIN} loading={loading} />
      )}
    </Box>
  );
};
