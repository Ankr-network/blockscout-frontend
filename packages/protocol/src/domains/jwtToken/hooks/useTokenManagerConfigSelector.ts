import { useAppSelector } from 'store/useAppSelector';
import { selectTokenManagerConfig } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { RootState } from 'store';
import { PRIMARY_TOKEN_INDEX } from '../utils/utils';
import { fetchAllJwtTokenRequests } from 'domains/jwtToken/action/getAllJwtToken';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export const useTokenManagerConfigSelector = () => {
  const { address } = useAuth();

  const config = useAppSelector((state: RootState) =>
    selectTokenManagerConfig(state, address),
  );

  const [, { data }] = useQueryEndpoint(fetchAllJwtTokenRequests);

  return {
    ...config,
    address,
    tokenIndex: config.tokenIndex ?? PRIMARY_TOKEN_INDEX,
    shouldShowTokenManager: data?.shouldShowTokenManager,
  };
};
