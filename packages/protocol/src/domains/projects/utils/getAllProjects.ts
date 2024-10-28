import {
  GetUserEndpointTokenStatusResponse,
  IGetWhitelistParamsResponse,
  WhitelistItem,
  BlockchainID,
  UserEndpointToken,
} from 'multirpc-sdk';
import { ChainPath } from '@ankr.com/chains-list';

import { IJWTStatus } from 'domains/jwtToken/action/fetchJWTsStatuses';
import { renderProjectName } from 'domains/jwtToken/utils/renderProjectName';

import { IProjectWithBlockchains } from '../actions/fetchProjectsWhitelistsBlockchains';
import { JWT } from '../../jwtToken/store/jwtTokenManagerSlice';
import { ProjectActivity } from '../store';

export interface ProjectStatus extends GetUserEndpointTokenStatusResponse {
  draft?: boolean;
}

export interface Project {
  name: string;
  description: string;
  isFrozen: boolean;
  whitelist?: WhitelistItem[];
  blockchains?: BlockchainID[];
  userEndpointToken: UserEndpointToken;
  tokenIndex: number;
}

export interface ProjectTable extends Project {
  projectStatus: ProjectStatus;
  projectActivity?: ProjectActivity;
  isLoading?: boolean;
}

export const DEFAULT_PROJECT_STATUS: ProjectStatus = {
  draft: false,
  suspended: false,
  frozen: false,
  freemium: false,
};

interface GetAllProjectsParams {
  allChainsPaths: ChainPath[];
  isLoading: boolean;
  projectStatuses: IJWTStatus[];
  projects: JWT[];
  whitelistBlockchains: IProjectWithBlockchains[];
  whitelists: IGetWhitelistParamsResponse[];
}

export const getAllProjects = ({
  allChainsPaths,
  isLoading,
  projectStatuses,
  projects,
  whitelistBlockchains,
  whitelists,
}: GetAllProjectsParams): Project[] =>
  projects.map((item, index) => {
    const currentProjectStatus = projectStatuses.find(
      projectStatus =>
        projectStatus.userEndpointToken === item.userEndpointToken,
    );

    let blockchains = whitelistBlockchains.find(
      whitelist => whitelist.userEndpointToken === item.userEndpointToken,
    )?.blockchains;

    if (blockchains?.length === 0) {
      // empty array means all blockchains are selected. setting allAvailablePaths to manage subchains
      blockchains = allChainsPaths;
    }

    return {
      whitelist: whitelists[index]?.lists,
      blockchains,
      isLoading,
      name: item.name || renderProjectName(item.index),
      tokenIndex: item.index,
      isFrozen: Boolean(currentProjectStatus?.status?.frozen),
      userEndpointToken: item.userEndpointToken,
      description: item.description,
    };
  });
