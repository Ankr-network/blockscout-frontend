import { generatePath, Redirect, useParams } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import { PageNotFound } from 'modules/common/components/PageNotFound';
import { STAKING_PATH, isMainnet } from 'modules/common/const';
import { EParachainPolkadotNetwork } from 'modules/common/types';
import { loadComponent } from 'modules/common/utils/loadComponent';

import { createRouteConfig } from '../router/utils/createRouteConfig';

import { DefaultLayout } from './components/DefautLayout';
import { MyRewardsClaimModal } from './components/MyRewardsClaimModal';
import { ProjectsListClaimModal } from './components/ProjectsListClaimModal';

export interface IRouteClaimData {
  id: string;
  network: string;
}

const ROOT = `${STAKING_PATH}liquid-crowdloan/`;
const CROWDLOANS_PATH = `${ROOT}:network/`;
const LEND_PATH = `${CROWDLOANS_PATH}lend/:id/:name/`;
const REWARDS_CLAIM_PATH = `${CROWDLOANS_PATH}rewards-claim/:id/`;
const PROJECTS_CLAIM_PATH = `${CROWDLOANS_PATH}projects-claim/:id/`;

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

const PolkadotSlotAuction = loadComponent(() =>
  import('./screens/PolkadotSlotAuction').then(
    module => module.PolkadotSlotAuction,
  ),
);

const SupportProject = loadComponent(() =>
  import('./screens/SupportProject').then(module => module.SupportProject),
);

const PARACHAIN_NETWORK_BY_ENV = isMainnet
  ? EParachainPolkadotNetwork.DOT.toLowerCase()
  : EParachainPolkadotNetwork.WND.toLowerCase();

export function getRoutes(): JSX.Element {
  return (
    <Route path={RoutesConfig.root}>
      <Switch>
        <Route exact path={RoutesConfig.root}>
          <Redirect
            to={RoutesConfig.crowdloans.generatePath(PARACHAIN_NETWORK_BY_ENV)}
          />
        </Route>

        <Route exact path={RoutesConfig.crowdloans.path}>
          <DefaultLayout>
            <PolkadotSlotAuction />
          </DefaultLayout>
        </Route>

        <Route exact path={RoutesConfig.lend.path}>
          <DefaultLayout>
            <SupportProject />
          </DefaultLayout>
        </Route>

        <Route exact path={RoutesConfig.projectsClaim.path}>
          <DefaultLayout>
            <ProjectsListClaimModal />
          </DefaultLayout>
        </Route>

        <Route exact path={RoutesConfig.rewardsClaim.path}>
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
