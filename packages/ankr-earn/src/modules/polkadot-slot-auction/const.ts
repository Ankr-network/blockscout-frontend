import { generatePath, useParams } from 'react-router';

import { isMainnet, EARN_PATH } from 'modules/common/const';
import { BlockchainNetworkId } from 'modules/common/types';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const validETHChainId: BlockchainNetworkId = isMainnet
  ? BlockchainNetworkId.mainnet
  : BlockchainNetworkId.goerli;

const ROOT = `${EARN_PATH}liquid-crowdloan/`;
const CROWDLOANS_PATH = `${ROOT}:network/`;
const LEND_PATH = `${CROWDLOANS_PATH}lend/:id/:name/`;
const PROJECTS_CLAIM_PATH = `${CROWDLOANS_PATH}projects-claim/:id/`;
const REWARDS_CLAIM_PATH = `${CROWDLOANS_PATH}rewards-claim/:id/`;

export interface IRouteClaimData {
  id: string;
  network: string;
}

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
