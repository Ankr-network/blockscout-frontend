import {
  IGetWhitelistParamsResponse,
  WhitelistItem,
  IJwtTokenStatusResponse,
} from 'multirpc-sdk';

import { renderProjectName } from 'domains/jwtToken/utils/renderProjectName';

import { StatsByRange } from '../actions/fetchStatsByRange';

export interface Project {
  name: string;
  description: string;
  statsData?: StatsByRange;
  tokenIndex: number;
  isFrozen: boolean;
  userEndpointToken: string;
  whitelist?: WhitelistItem[];
}

interface UserEndpointInfo {
  userEndpoint: string;
  index: number;
  name: string;
  description: string;
}

export const getAllProjects = (
  userEndpointInfo: UserEndpointInfo[],
  whitelists: IGetWhitelistParamsResponse[],
  projectStatuses: IJwtTokenStatusResponse[],
) =>
  userEndpointInfo.map<Project>((item, index) => ({
    name: item.name ? item.name : renderProjectName(item.index),
    statsData: {
      data: undefined,
      error: undefined,
    },
    tokenIndex: item.index,
    isFrozen: projectStatuses[index]?.frozen,
    userEndpointToken: item.userEndpoint,
    whitelist: whitelists[index]?.lists,
    description: item.description,
  }));
