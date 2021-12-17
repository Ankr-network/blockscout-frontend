import loadable, { LoadableComponent } from '@loadable/component';
import { PARACHAIN_BONDING_PATH as ROOT } from 'modules/common/const';
import React from 'react';
import { generatePath, useParams } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { PageNotFound } from 'uiKit/PageNotFound';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';
import { createRouteConfig } from '../router/utils/createRouteConfig';
import { withPolkadotSlotAuctionLayout } from './layout';

const CROWDLOANS_PATH = `${ROOT}/:network/crowdloans`;
const LEND_PATH = `${CROWDLOANS_PATH}/lend/:id/:name`;

export const RoutesConfig = createRouteConfig(
  {
    crowdloans: {
      path: CROWDLOANS_PATH,
      generatePath: (network: string) =>
        generatePath(CROWDLOANS_PATH, { network }),
      useParams: () => useParams<{ network: string }>(),
    },
    lend: {
      path: LEND_PATH,
      generatePath: (network: string, id: number, name?: string) =>
        generatePath(LEND_PATH, {
          network,
          id,
          name: name ? name.toLowerCase() : '/',
        }),
      useParams: () => useParams<{ id: string; name: string }>(),
    },
  },
  ROOT,
);

const PolkadotSlotAuctionContainer = withPolkadotSlotAuctionLayout(
  loadable(
    async () =>
      import('./PolkadotSlotAuction').then(
        module => module.PolkadotSlotAuction,
      ),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const PolkadotSlotAuctionLend = withPolkadotSlotAuctionLayout(
  loadable(
    async () =>
      import('./components/SupportProject').then(
        module => module.SupportProject,
      ),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

export function getRoutes() {
  return (
    <Route path={RoutesConfig.root}>
      <Switch>
        <Route
          path={RoutesConfig.crowdloans.path}
          component={PolkadotSlotAuctionContainer}
          exact
        />
        <Route
          path={RoutesConfig.lend.path}
          component={PolkadotSlotAuctionLend}
          exact
        />
        <Route component={withPolkadotSlotAuctionLayout(PageNotFound)} />
      </Switch>
    </Route>
  );
}
