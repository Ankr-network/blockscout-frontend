import { useAppSelector } from 'store/useAppSelector';
import { selectTokenManagerConfig } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { selectCurrentAddress } from 'domains/auth/store';

import { PRIMARY_TOKEN_INDEX } from '../utils/utils';
import { useJwtManager } from './useJwtManager';

export const useTokenManagerConfigSelector = () => {
  const address = useAppSelector(selectCurrentAddress);

  const config = useAppSelector(state =>
    selectTokenManagerConfig(state, address),
  );

  const { hasReadAccess: shouldShowTokenManager } = useJwtManager();

  return {
    ...config,
    selectedProjectEndpointToken: config.selectedProject,
    address,
    tokenIndex: config.tokenIndex ?? PRIMARY_TOKEN_INDEX,
    shouldShowTokenManager,
  };
};
