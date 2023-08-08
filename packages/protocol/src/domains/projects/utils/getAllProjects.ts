import {
  IGetWhitelistParamsResponse,
  WhitelistItem,
  StatsByRangeResponse,
} from 'multirpc-sdk';

import { renderProjectName } from 'domains/jwtToken/utils/renderProjectName';

export interface StatsData {
  statsByRange: StatsByRangeResponse;
  hasError: boolean;
}

export interface Project {
  name: string;
  whitelist?: WhitelistItem[];
  userEndpointToken: string;
  tokenIndex: number;
  statsData: StatsData;
}

interface UserEndpointInfo {
  userEndpoint: string;
  index: number;
}

export const getAllProjects = (
  userEndpointInfo: UserEndpointInfo[],
  whitelists: IGetWhitelistParamsResponse[],
): Project[] =>
  userEndpointInfo.map((item, index) => ({
    whitelist: whitelists[index]?.lists,
    name: renderProjectName(item.index),
    userEndpointToken: item.userEndpoint,
    tokenIndex: item.index,
    statsData: { statsByRange: {}, hasError: false },
  }));
