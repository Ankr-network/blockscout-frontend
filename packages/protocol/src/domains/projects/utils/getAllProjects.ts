import {
  StatsByRangeResponse,
  GetUserEndpointTokenStatusResponse,
  IGetWhitelistParamsResponse,
  WhitelistItem,
} from 'multirpc-sdk';

import { renderProjectName } from 'domains/jwtToken/utils/renderProjectName';
import { FetchTokenStatusResponse } from 'domains/jwtToken/action/getAllJwtTokensStatuses';

import { JwtManagerToken } from '../../jwtToken/store/jwtTokenManagerSlice';

export interface ProjectStatus extends GetUserEndpointTokenStatusResponse {
  draft?: boolean;
}

export interface Project {
  name: string;
  description: string;
  isFrozen: boolean;
  whitelist?: WhitelistItem[];
  userEndpointToken: string;
  tokenIndex: number;
}

export interface ProjectTable extends Project {
  statsByRange: StatsByRangeResponse;
  projectStatus: ProjectStatus;
}

export const DEFAULT_PROJECT_STATUS: ProjectStatus = {
  draft: false,
  suspended: false,
  frozen: false,
  freemium: false,
};

export const getAllProjects = (
  userEndpointInfo: JwtManagerToken[],
  whitelists: IGetWhitelistParamsResponse[],
  projectStatuses: FetchTokenStatusResponse[],
): Project[] =>
  userEndpointInfo.map((item, index) => {
    const currentProjectStatus = projectStatuses.find(
      projectStatus =>
        projectStatus.userEndpointToken === item.userEndpointToken,
    );

    return {
      whitelist: whitelists[index]?.lists,
      name: item.name || renderProjectName(item.index),
      tokenIndex: item.index,
      isFrozen: Boolean(currentProjectStatus?.status?.frozen),
      userEndpointToken: item.userEndpointToken,
      description: item.description,
    };
  });
