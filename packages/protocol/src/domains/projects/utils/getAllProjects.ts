import {
  StatsByRangeResponse,
  GetUserEndpointTokenStatusResponse,
  IGetWhitelistParamsResponse,
  WhitelistItem,
  BlockchainID,
} from 'multirpc-sdk';

import { renderProjectName } from 'domains/jwtToken/utils/renderProjectName';
import { FetchTokenStatusResponse } from 'domains/jwtToken/action/getAllJwtTokensStatuses';

import { JwtManagerToken } from '../../jwtToken/store/jwtTokenManagerSlice';
import { MappedWhitelistBlockchainsResponse } from '../actions/fetchWhitelistBlockchains';

export interface ProjectStatus extends GetUserEndpointTokenStatusResponse {
  draft?: boolean;
}

export interface Project {
  name: string;
  description: string;
  isFrozen: boolean;
  whitelist?: WhitelistItem[];
  blockchains?: BlockchainID[];
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

interface GetAllProjectsParams {
  projects: JwtManagerToken[];
  whitelists: IGetWhitelistParamsResponse[];
  whitelistBlockchains: MappedWhitelistBlockchainsResponse[];
  projectStatuses: FetchTokenStatusResponse[];
}

export const getAllProjects = ({
  projects,
  whitelists,
  whitelistBlockchains,
  projectStatuses,
}: GetAllProjectsParams): Project[] =>
  projects.map((item, index) => {
    const currentProjectStatus = projectStatuses.find(
      projectStatus =>
        projectStatus.userEndpointToken === item.userEndpointToken,
    );

    const blockchains = whitelistBlockchains.find(
      whitelist => whitelist.userEndpointToken === item.userEndpointToken,
    )?.blockchains;

    return {
      whitelist: whitelists[index]?.lists,
      blockchains,
      name: item.name || renderProjectName(item.index),
      tokenIndex: item.index,
      isFrozen: Boolean(currentProjectStatus?.status?.frozen),
      userEndpointToken: item.userEndpointToken,
      description: item.description,
    };
  });
