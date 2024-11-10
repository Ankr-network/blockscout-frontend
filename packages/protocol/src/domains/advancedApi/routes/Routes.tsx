import loadable, { LoadableComponent } from '@loadable/component';
import { OverlaySpinner } from '@ankr.com/ui';
import { Route } from 'react-router-dom';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';

import { AdvancedApiRoutesConfig } from './routesConfig';

const LoadableAdvancedApiContainer: LoadableComponent<any> = loadable(
  async () =>
    import('../screens/AdvancedApiPage').then(module => module.AdvancedApiPage),
  {
    fallback: <OverlaySpinner />,
  },
);

export function AdvancedApiRoutes() {
  return (
    <GuardUserGroup shouldRedirect blockName={BlockWithPermission.ChainItem}>
      <Route
        exact
        path={AdvancedApiRoutesConfig.advancedApi.path}
        component={LoadableAdvancedApiContainer}
      />
    </GuardUserGroup>
  );
}
