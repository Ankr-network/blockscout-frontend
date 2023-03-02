import { Box } from '@mui/material';
import { t } from '@ankr.com/common';

import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { AdvancedApiRoutesConfig } from 'domains/advancedApi/routes';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { PrivateChainItemQuery } from 'domains/chains/screens/ChainItem/PrivateChainItemQuery';
import { PublicChainItemQuery } from 'domains/chains/screens/ChainItem/PublicChainItemQuery';
import { ChainID } from 'modules/chains/types';
import { UpgradePlanBanner } from 'modules/common/components/UpgradePlanBanner';
import { CONTENT_WIDTH } from 'modules/layout/components/DefautLayout';

export const AdvancedApiDetails = () => {
  const { hasPrivateAccess, loading } = useAuth();

  useSetBreadcrumbs([
    {
      title: t(AdvancedApiRoutesConfig.advancedApi.breadcrumbs),
    },
  ]);

  return (
    <Box
      sx={{ maxWidth: CONTENT_WIDTH, marginLeft: 'auto', marginRight: 'auto' }}
    >
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
