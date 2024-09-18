import { Box } from '@mui/material';
import { t } from '@ankr.com/common';
import { ChainID } from '@ankr.com/chains-list';

import { AdvancedApiRoutesConfig } from 'domains/advancedApi/routes';
import { CONTAINER_STYLES } from 'modules/layout/components/DefautLayout';
import { PrivateChainItemWrapper } from 'domains/chains/screens/ChainItem/PrivateChainItemQuery';
import { PublicChainItemWrapper } from 'domains/chains/screens/ChainItem/PublicChainItemWrapper';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useRedirectToEnterpriseOnGroupChange } from 'hooks/useRedirectToEnterpriseOnGroupChange';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';

export const AdvancedApiPage = () => {
  const { hasPrivateAccess, loading } = useAuth();

  useSetBreadcrumbs([
    {
      title: t(AdvancedApiRoutesConfig.advancedApi.breadcrumbs),
    },
  ]);

  useRedirectToEnterpriseOnGroupChange();

  return (
    <Box sx={CONTAINER_STYLES}>
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
