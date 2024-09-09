import { Box } from '@mui/material';
import { t } from '@ankr.com/common';

import { AdvancedApiRoutesConfig } from 'domains/advancedApi/routes';
import { CONTAINER_STYLES } from 'modules/layout/components/DefautLayout';
import { ChainID } from 'modules/chains/types';
import { PrivateChainItemWrapper } from 'domains/chains/screens/ChainItem/PrivateChainItemQuery';
import { PublicChainItemWrapper } from 'domains/chains/screens/ChainItem/PublicChainItemWrapper';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useRedirectToEnterpriseOnGroupChange } from 'hooks/useRedirectToEnterpriseOnGroupChange';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';
import { UpgradePlanBanner } from 'modules/common/components/UpgradePlanBanner';

export const AdvancedApiPage = () => {
  const { hasPremium, hasPrivateAccess, loading } = useAuth();

  useSetBreadcrumbs([
    {
      title: t(AdvancedApiRoutesConfig.advancedApi.breadcrumbs),
    },
  ]);

  useRedirectToEnterpriseOnGroupChange();

  return (
    <Box sx={CONTAINER_STYLES}>
      {!hasPremium && <UpgradePlanBanner isPublicUser />}
      {hasPrivateAccess ? (
        <PrivateChainItemWrapper
          chainId={ChainID.MULTICHAIN}
          loading={loading}
        />
      ) : (
        <PublicChainItemWrapper
          chainId={ChainID.MULTICHAIN}
          loading={loading}
        />
      )}
    </Box>
  );
};
