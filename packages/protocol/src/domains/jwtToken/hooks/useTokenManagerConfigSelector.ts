import { useAppSelector } from 'store/useAppSelector';
import { selectTokenManagerConfig } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { selectCurrentAddress } from 'domains/auth/store';
import { ALL_PROJECTS_VALUE } from 'domains/projects/const';

import { PRIMARY_TOKEN_INDEX } from '../utils/utils';
import { useJwtManager } from './useJwtManager';

export const useTokenManagerConfigSelector = () => {
  const address = useAppSelector(selectCurrentAddress);

  const config = useAppSelector(state =>
    selectTokenManagerConfig(state, address),
  );

  const { hasReadAccess: shouldShowTokenManager } = useJwtManager();

  const selectedProjectEndpointToken =
    config.selectedProject === ALL_PROJECTS_VALUE
      ? undefined
      : config.selectedProject;

  return {
    ...config,
    selectedProjectEndpointToken,
    address,
    tokenIndex: config.tokenIndex || PRIMARY_TOKEN_INDEX,
    shouldShowTokenManager,
  };
};
