import loadable from '@loadable/component';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { EARN_PATH, isMainnet } from 'modules/common/const';
import { EParachainPolkadotNetwork } from 'modules/common/types';
import React from 'react';
import { generatePath, Redirect, useParams } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';
import { createRouteConfig } from '../router/utils/createRouteConfig';
import { DefaultLayout } from './components/DefautLayout';
import { MyRewardsClaimModal } from './components/MyRewardsClaimModal';
import { ProjectsListClaimModal } from './components/ProjectsListClaimModal';

export interface IRouteClaimData {
  id: string;
  network: string;
}

const ROOT = `${EARN_PATH}liquid-crowdloan/`;
const CROWDLOANS_PATH = `${ROOT}:network/`;
const LEND_PATH = `${CROWDLOANS_PATH}lend/:id/:name/`;
const PROJECTS_CLAIM_PATH = `${CROWDLOANS_PATH}projects-claim/:id/`;
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
    projectsClaim: {
      path: PROJECTS_CLAIM_PATH,
      generatePath: (network: string, id: number): string =>
        generatePath(PROJECTS_CLAIM_PATH, {
          id,
          network,
        }),
      useParams: (): IRouteClaimData => useParams<IRouteClaimData>(),
    },
    rewardsClaim: {
      path: REWARDS_CLAIM_PATH,
      generatePath: (network: string, id: number): string =>
        generatePath(REWARDS_CLAIM_PATH, {
          id,
          network,
        }),
      useParams: (): IRouteClaimData => useParams<IRouteClaimData>(),
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

const PARACHAIN_NETWORK_BY_ENV = isMainnet
  ? EParachainPolkadotNetwork.DOT.toLowerCase()
  : EParachainPolkadotNetwork.WND.toLowerCase();

export function getRoutes() {
  return (
    <Route path={RoutesConfig.root}>
      <Switch>
        <Route path={RoutesConfig.root} exact>
          <Redirect
            to={RoutesConfig.crowdloans.generatePath(PARACHAIN_NETWORK_BY_ENV)}
          />
        </Route>

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

        <Route path={RoutesConfig.projectsClaim.path} exact>
          <DefaultLayout>
            <ProjectsListClaimModal />
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
