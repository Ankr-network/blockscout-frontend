import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';
import { OverlaySpinner } from '@ankr.com/ui';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';

import { ChainsRoutesConfig } from './routesConfig';

const LoadableChainsContainer: LoadableComponent<any> = loadable(
  async () =>
    import('../screens/ChainsListPage').then(module => module.ChainsListPage),
  {
    fallback: <OverlaySpinner />,
  },
);

const LoadableChainDetailsContainer: LoadableComponent<any> = loadable(
  async () => import('../screens/ChainPage').then(module => module.ChainPage),
  {
    fallback: <OverlaySpinner />,
  },
);

export function ChainsRoutes() {
  return (
    <GuardUserGroup
      blockName={BlockWithPermission.ChainItem}
      shouldRedirect
      shouldHideAlert
    >
      <Route
        exact
        path={ChainsRoutesConfig.chains.path}
        component={LoadableChainsContainer}
      />
    </GuardUserGroup>
  );
}

export function ChainDetailsRoutes() {
  return (
    <GuardUserGroup blockName={BlockWithPermission.ChainItem} shouldRedirect>
      <Route
        exact
        path={ChainsRoutesConfig.chainDetails.path}
        component={LoadableChainDetailsContainer}
      />
    </GuardUserGroup>
  );
}
