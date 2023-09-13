import { useLocation } from 'react-router-dom';

import { EnterpriseRoutesConfig } from 'domains/enterprise/routes';

const chainsPageRoutePath = EnterpriseRoutesConfig.chains.path;

export const useIsEnterpriseRoute = () => {
  const { pathname } = useLocation();

  const isEnterpriseRoute = pathname.includes(chainsPageRoutePath);
  const isEnterpriseChainsListPage = pathname === chainsPageRoutePath;

  return { isEnterpriseRoute, isEnterpriseChainsListPage };
};
