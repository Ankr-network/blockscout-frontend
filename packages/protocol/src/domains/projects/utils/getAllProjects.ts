import { IGetWhitelistParamsResponse, WhitelistItem } from 'multirpc-sdk';

import { renderProjectName } from 'domains/jwtToken/utils/renderProjectName';

import { StatsByRange } from '../actions/fetchStatsByRange';

export interface Project {
  name: string;
  statsData?: StatsByRange;
  tokenIndex: number;
  userEndpointToken: string;
  whitelist?: WhitelistItem[];
}

interface UserEndpointInfo {
  userEndpoint: string;
  index: number;
}

export const getAllProjects = (
  userEndpointInfo: UserEndpointInfo[],
  whitelists: IGetWhitelistParamsResponse[],
) =>
  userEndpointInfo.map<Project>((item, index) => ({
    name: renderProjectName(item.index),
    statsData: {
      data: undefined,
      error: undefined,
    },
    tokenIndex: item.index,
    userEndpointToken: item.userEndpoint,
    whitelist: whitelists[index]?.lists,
  }));
