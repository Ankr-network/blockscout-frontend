import loadable from '@loadable/component';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { EARN_PATH } from 'modules/common/const';
import React from 'react';
import { generatePath, useParams } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';
import { createRouteConfig } from '../router/utils/createRouteConfig';
import { DefaultLayout } from './components/DefautLayout';
import { MyRewardsClaimModal } from './components/MyRewardsClaimModal';

export interface IRouteRewardsClaimData {
  id: string;
  network: string;
}

const ROOT = `${EARN_PATH}liquid-crowdloan/`;
const CROWDLOANS_PATH = `${ROOT}:network/`;
const LEND_PATH = `${CROWDLOANS_PATH}lend/:id/:name/`;
const REWARDS_CLAIM_PATH = `${CROWDLOANS_PATH}rewards-claim/:id/`;

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
    rewardsClaim: {
      path: REWARDS_CLAIM_PATH,
      generatePath: (network: string, id: number): string =>
        generatePath(REWARDS_CLAIM_PATH, {
          id,
          network,
        }),
      useParams: (): IRouteRewardsClaimData =>
        useParams<IRouteRewardsClaimData>(),
    },
  },
  ROOT,
);

const PolkadotSlotAuction = loadable(
  async () =>
    import('./screens/PolkadotSlotAuction').then(
      module => module.PolkadotSlotAuction,
    ),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const SupportProject = loadable(
  async () =>
    import('./screens/SupportProject').then(module => module.SupportProject),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function getRoutes() {
  return (
    <Route path={RoutesConfig.root}>
      <Switch>
        <Route path={RoutesConfig.crowdloans.path} exact>
          <DefaultLayout>
            <PolkadotSlotAuction />
          </DefaultLayout>
        </Route>

        <Route path={RoutesConfig.lend.path} exact>
          <DefaultLayout>
            <SupportProject />
          </DefaultLayout>
        </Route>

        <Route path={RoutesConfig.rewardsClaim.path} exact>
          <DefaultLayout>
            <MyRewardsClaimModal />
          </DefaultLayout>
        </Route>

        <Route>
          <DefaultLayout>
            <PageNotFound />
          </DefaultLayout>
        </Route>
      </Switch>
    </Route>
  );
}
